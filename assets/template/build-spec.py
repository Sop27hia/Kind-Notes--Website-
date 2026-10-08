#!/usr/bin/env python3
"""Build template-spec.json from Canva's own page JSON plus the editorial layer.

Two inputs, with a clean split of responsibility:

  canva/page-NN.json  geometry, exactly as Canva reports it for the master
                      " Birthday magazine template" (DAG8FzG6gq8). Positions,
                      sizes, rotations, grid template areas, SVG paths and
                      strokes all come from here and are never hand-typed.
  editorial.json      judgement Canva cannot supply: which replaceable frames
                      are real customer photo slots rather than stock art,
                      which text the customer writes, page titles and notes.

Canva lays out at 96 px per inch, so one design pixel is 25.4/96 mm. Both are
carried: the editor canvas scales the px, the print path needs the mm.

Run from the repository root:  python3 assets/template/build-spec.py
"""
import glob
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
PX2MM = 25.4 / 96.0
DESIGN_ID = "DAG8FzG6gq8"
DESIGN_TITLE = " Birthday magazine template"

# Measured off two independent renders of page 4 (the blank Canva thumbnail
# and the filled PDF); Canva does not expose the grid gutter.
GRID_GAP_PX = 1.9


def mm(v):
    return round(v * PX2MM, 3)


def box(el):
    """Canva's top/left is the *unrotated* bounding box; rotation is about the
    element's centre, which is how CSS `transform-origin: center` behaves."""
    x, y, w, h = el["left"], el["top"], el["width"], el["height"]
    out = {
        "x_px": round(x, 3), "y_px": round(y, 3),
        "w_px": round(w, 3), "h_px": round(h, 3),
        "x_mm": mm(x), "y_mm": mm(y), "w_mm": mm(w), "h_mm": mm(h),
    }
    if el.get("rotation"):
        out["rotation_deg"] = round(el["rotation"], 4)
    return out


def solid(colour_holder):
    if not colour_holder:
        return None
    c = colour_holder.get("color")
    if isinstance(c, dict):
        return c.get("color")
    return c


def labels_of(el):
    """Every autofill field label hanging off an element, in reading order."""
    found = []
    for cell in el.get("cells", []):
        lab = (cell.get("fill") or {}).get("dataFieldLabel")
        if lab:
            found.append(lab)
    for path in el.get("paths", []):
        lab = (path.get("fill") or {}).get("dataFieldLabel")
        if lab:
            found.append(lab)
    lab = (el.get("fill") or {}).get("dataFieldLabel")
    if lab:
        found.append(lab)
    return found


def photo_slot(el, notes):
    slot = {"id": el["id"], "kind": el["type"], **box(el)}

    if el["type"] == "grid":
        cells = [c["id"] for c in el.get("cells", [])]
        slot["cells"] = cells
        slot["templateAreas"] = el.get("templateAreas")
        slot["capacity"] = len(cells)
        slot["cell_labels"] = {
            c["id"]: (c.get("fill") or {}).get("dataFieldLabel")
            for c in el.get("cells", [])
            if (c.get("fill") or {}).get("dataFieldLabel")
        }
    else:
        slot["capacity"] = 1

    if el["type"] == "shape":
        # The frame's outline. Canva scales it nine-slice so the corners keep
        # their aspect; the renderer stretches the viewBox instead, which is
        # exact for straight-edged shapes and slightly off for rounded ones.
        paths = el.get("paths") or []
        fillable = next(
            (p for p in paths if (p.get("fill") or {}).get("isMediaReplaceable")), None
        )
        chosen = fillable or (paths[0] if paths else None)
        if chosen:
            vb = el.get("viewBox") or {}
            slot["path"] = {
                "d": chosen["d"],
                "viewBox": [
                    vb.get("left", 0), vb.get("top", 0),
                    vb.get("width", el["width"]), vb.get("height", el["height"]),
                ],
            }
            if el.get("nineSlice"):
                slot["nine_slice"] = el["nineSlice"]
            weight = (chosen.get("stroke") or {}).get("weight") or 0
            if weight:
                slot["stroke"] = weight
                slot["strokeColor"] = solid(chosen.get("stroke"))

    weight = (el.get("stroke") or {}).get("weight") or 0
    if weight and "stroke" not in slot:
        slot["stroke"] = weight
        slot["strokeColor"] = solid(el.get("stroke"))

    if el.get("opacity", 1) != 1:
        slot["opacity"] = el["opacity"]

    found = labels_of(el)
    if found:
        slot["autofill_field_labels"] = found
    if notes.get(el["id"]):
        slot["note"] = notes[el["id"]]
    return slot


def text_field(el, editorial):
    regions = el.get("textRegions") or []
    fmts = [r.get("formatting", {}) for r in regions]
    first = fmts[0] if fmts else {}
    chars = "".join(r.get("characters", "") for r in regions)
    meta = editorial.get(el["id"], {})

    field = {
        "id": el["id"],
        "role": meta.get("role", "fixed"),
        "placeholder": meta.get("placeholder", chars.strip()),
        "source_text": chars,
        **box(el),
        "fontSize": [f.get("fontSize") for f in fmts] if len(fmts) > 1 else first.get("fontSize"),
        "fontRef": [f.get("fontRef") for f in fmts] if len(fmts) > 1 else first.get("fontRef"),
        "color": first.get("color"),
        "align": first.get("textAlign"),
        "lineHeight": first.get("lineHeight"),
        "letterSpacing": first.get("letterSpacing"),
    }
    if first.get("fontWeight") and first["fontWeight"] != "normal":
        field["fontWeight"] = first["fontWeight"]
    if first.get("fontStyle") and first["fontStyle"] != "normal":
        field["fontStyle"] = first["fontStyle"]
    if el.get("opacity", 1) != 1:
        field["opacity"] = el["opacity"]
    if meta.get("note"):
        field["note"] = meta["note"]
    return {k: v for k, v in field.items() if v is not None}


def decor_item(el):
    """Fixed artwork: tape, torn paper, film strips, the stock flat-lays. None
    of it is exported yet, so the renderer can only show where it belongs."""
    item = {"id": el["id"], "kind": el["type"], **box(el)}
    media = ((el.get("fill") or {}).get("media") or {}).get("mediaId")
    if not media:
        for path in el.get("paths", []):
            media = ((path.get("fill") or {}).get("media") or {}).get("mediaId")
            if media:
                break
    if media:
        item["media_id"] = media
    if el["type"] == "text":
        item["text"] = "".join(r.get("characters", "") for r in el.get("textRegions", []))
    return item


def main():
    editorial = json.load(open(f"{HERE}/editorial.json"))["pages"]
    pages = []

    for path in sorted(glob.glob(f"{HERE}/canva/page-*.json")):
        index = int(os.path.basename(path)[5:7])
        raw = json.load(open(path))
        ed = editorial.get(str(index), {})
        slot_ids = set(ed.get("customer_slot_ids", []))
        text_meta = ed.get("text", {})
        slot_notes = ed.get("slot_notes", {})

        photo_slots, text_fields, decor = [], [], []
        for el in raw["elements"]:
            if el["id"] in slot_ids:
                photo_slots.append(photo_slot(el, slot_notes))
            elif el["type"] == "text":
                field = text_field(el, text_meta)
                (text_fields if field["role"] != "fixed-art" else decor).append(field)
            else:
                decor.append(decor_item(el))

        pages.append({
            "index": index,
            "canva_page_id": raw["id"],
            "title": ed.get("title", ""),
            **({"note": ed["note"]} if ed.get("note") else {}),
            "background": solid((raw.get("background") or {}).get("color"))
            or (raw.get("background") or {}).get("color", "#ffffff"),
            "photo_capacity": sum(s["capacity"] for s in photo_slots),
            "photo_slots": photo_slots,
            "text_fields": text_fields,
            "decor": decor,
            "fixed_decor_count": len(decor),
        })

    first = json.load(open(f"{HERE}/canva/page-01.json"))
    w, h = first["dimensions"]["width"], first["dimensions"]["height"]
    spec = {
        "source": {
            "provider": "canva",
            "design_id": DESIGN_ID,
            "title": DESIGN_TITLE,
            "page_count": len(pages),
            "note": "Geometry is Canva's own JSON (assets/template/canva/), never "
                    "retyped. Editorial judgement lives in editorial.json.",
        },
        "page": {
            "width_px": w, "height_px": h,
            "width_mm": mm(w), "height_mm": mm(h),
            "px_per_inch": 96, "px_to_mm": PX2MM,
            "trim_mm": {"width": 210, "height": 297},
            "bleed_mm": round((mm(w) - 210) / 2, 3),
            "note": "Canva page = A4 trim plus bleed. The source PDF carried no "
                    "TrimBox; the printer must be told where to cut.",
            "grid_gap_px": GRID_GAP_PX,
            "grid_gap_mm": round(GRID_GAP_PX * PX2MM, 3),
            "grid_gap_note": "Canva does not expose the grid gutter, so it was "
                             "measured off two independent renders of page 4. Both "
                             "give ~1.9 design px.",
        },
        "totals": {
            "photo_capacity": sum(p["photo_capacity"] for p in pages),
            "slot_elements": sum(len(p["photo_slots"]) for p in pages),
            "text_fields": sum(len(p["text_fields"]) for p in pages),
            "decor_elements": sum(len(p["decor"]) for p in pages),
        },
        "pages": pages,
    }
    json.dump(spec, open(f"{HERE}/template-spec.json", "w"), indent=1, ensure_ascii=False)

    print(f"{'pg':>3} {'slots':>5} {'cap':>4} {'text':>5} {'decor':>5}  title")
    for p in pages:
        print(f"{p['index']:>3} {len(p['photo_slots']):>5} {p['photo_capacity']:>4} "
              f"{len(p['text_fields']):>5} {p['fixed_decor_count']:>5}  {p['title']}")
    print(json.dumps(spec["totals"], indent=1))


if __name__ == "__main__":
    main()
