"""Phase 0 fidelity check: draw template-spec geometry onto Canva's own render
of page 2. If the boxes land on the placeholders, the spec maps correctly and
the editor canvas can be driven from it."""
import json, sys
from PIL import Image, ImageDraw

SPEC = json.load(open("assets/template/template-spec.json"))
DESIGN_W = SPEC["page"]["width_px"]      # 809
PAGE = next(p for p in SPEC["pages"] if p["index"] == 2)

def overlay(ref_path, out_path, label):
    img = Image.open(ref_path).convert("RGB")
    s = img.width / DESIGN_W                    # design px -> reference px
    d = ImageDraw.Draw(img, "RGBA")
    for slot in PAGE["photo_slots"]:
        x, y = slot["x_px"]*s, slot["y_px"]*s
        w, h = slot["w_px"]*s, slot["h_px"]*s
        rot = slot.get("rotation_deg", 0)
        if abs(rot) < 0.01:
            d.rectangle([x, y, x+w, y+h], outline=(0,200,255,255), width=max(2,int(3*s)))
        else:  # draw the rotated rect about its centre
            import math
            cx, cy = x+w/2, y+h/2; a = math.radians(rot)
            pts = [(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)]
            pts = [(cx+px*math.cos(a)-py*math.sin(a), cy+px*math.sin(a)+py*math.cos(a)) for px,py in pts]
            d.polygon(pts, outline=(0,200,255,255))
            d.line(pts+[pts[0]], fill=(0,200,255,255), width=max(2,int(3*s)))
    for t in PAGE["text_fields"]:
        x, y = t["x_px"]*s, t["y_px"]*s
        w, h = t["w_px"]*s, t["h_px"]*s
        d.rectangle([x, y, x+w, y+h], outline=(255,60,160,255), width=max(2,int(2*s)))
    img.save(out_path)
    print(f"{label}: {img.width}x{img.height}  scale {s:.4f}  ->  {out_path}")

overlay("assets/template/reference/page-02-blank-canva.png",
        "assets/template/reference/page-02-overlay-blank.png", "blank template")
overlay("assets/template/reference/page-02-filled-pdf.png",
        "assets/template/reference/page-02-overlay-filled.png", "filled PDF")

print(f"\ncyan = photo slots ({len(PAGE['photo_slots'])}), magenta = text boxes ({len(PAGE['text_fields'])})")
for s_ in PAGE["photo_slots"]:
    print(f"  slot {s_['id']}  {s_['w_mm']:.1f}x{s_['h_mm']:.1f}mm @ ({s_['x_mm']:.1f},{s_['y_mm']:.1f})  rot {s_.get('rotation_deg',0)}")
for t in PAGE["text_fields"]:
    print(f"  text {t['id']}  \"{t['placeholder'][:28]}\"  {t['fontSize']:.1f}px  {t['fontRef']}")
