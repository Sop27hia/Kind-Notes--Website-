import json, glob, os
PX2MM = 25.4/96.0
PAGE_PX = {"w":809,"h":1138}

pages = {}
for f in sorted(glob.glob("raw-pages-*.json")):
    for k,v in json.load(open(f))["pages"].items():
        pages[int(k)] = v

def mm(v): return round(v*PX2MM, 3)
def box(e):
    b = {}
    for src,dst in (("left","x"),("top","y"),("width","w"),("height","h")):
        if src in e: b[dst+"_mm"] = mm(e[src]); b[dst+"_px"] = round(e[src],3)
    if e.get("rotation"): b["rotation_deg"] = round(e["rotation"],4)
    return b

spec = {
  "$comment": "Kind Notes Birthday Magazine — template spec extracted from Canva design DAG8FzG6gq8 (' Birthday magazine template').",
  "source": {"provider":"canva","design_id":"DAG8FzG6gq8","title":" Birthday magazine template","page_count":36},
  "page": {
    "width_px": PAGE_PX["w"], "height_px": PAGE_PX["h"],
    "width_mm": mm(PAGE_PX["w"]), "height_mm": mm(PAGE_PX["h"]),
    "px_per_inch": 96, "px_to_mm": PX2MM,
    "trim_mm": {"width":210,"height":297},
    "bleed_mm": round((mm(PAGE_PX["w"])-210)/2, 3),
    "note": "Canva page = A4 trim plus bleed. The source PDF carried no TrimBox; the printer must be told where to cut."
  },
  "fonts": {
    "YAF3ubalrAg": {"role":"display script","used_for":"Happy Birthday, Memories, Wishes, section headings","pages":"most"},
    "YAFdJpOISlU": {"role":"cover display / ultrabold serif","used_for":"BIRTHDAY masthead, Woman of the Year, numerals, artist name"},
    "YALBszUSD-E": {"role":"italic serif body","used_for":"bios, quotes, list items, captions"},
    "YAGL3riVrnU": {"role":"handwriting","used_for":"wishes, captions, closing message"},
    "YACgEQzTJgs": {"role":"formal script","used_for":"the long birthday letter (p5)"},
    "YAEz2L9phwY": {"role":"display script alt","used_for":"'Mermories' (p6)"},
    "YAD0xKJP184": {"role":"display script alt 2","used_for":"'of us' (p6)"},
    "YAFdJjvw9Ps": {"role":"small caps/sans","used_for":"cover date"},
    "YAFdJpCEKCQ": {"role":"cover secondary","used_for":"Top 10 Reasons cover line"},
    "YAFcfq7XuZE": {"role":"italic serif display","used_for":"birth date (p2)"},
    "_note": "Canva font refs. Each must be resolved to a real family and licensed before any non-Canva renderer can typeset customer text."
  },
  "pages": []
}

tot_slots = tot_text = 0
for i in range(1,37):
    p = pages.get(i)
    if not p: continue
    slots=[]
    for s in p.get("slots",[]):
        o={"id":s["el"],"kind":s.get("kind","rect")}
        o.update(box(s))
        if "cells" in s:
            o["cells"]=s["cells"]; o["templateAreas"]=s.get("templateAreas")
            o["capacity"]=len(s["cells"])
        else:
            o["capacity"]=1
        for k in ("stroke","strokeColor","shape","note"):
            if k in s: o[k]=s[k]
        slots.append(o)
    texts=[]
    for t in p.get("text",[]):
        o={"id":t["el"],"role":t.get("role","unclassified"),"placeholder":t.get("chars","")}
        o.update(box(t))
        for k in ("fontSize","fontRef","color","align","fontWeight","fontStyle","lineHeight","letterSpacing","opacity","note"):
            if k in t: o[k]=t[k]
        texts.append(o)
    cap=sum(s["capacity"] for s in slots)
    cust=[t for t in texts if t["role"].startswith("customer")]
    tot_slots+=cap; tot_text+=len(cust)
    spec["pages"].append({
      "index":i,"canva_page_id":p["id"],"title":p.get("title",""),
      "background":p["background"],
      "photo_capacity":cap,
      "photo_slots":slots,
      "text_fields":texts,
      "fixed_decor_count":len(p.get("decor",[])),
      **({"note":p["note"]} if "note" in p else {})
    })

spec["totals"]={"pages":len(spec["pages"]),"photo_slots":tot_slots,"customer_text_fields":tot_text}
json.dump(spec, open("template-spec.json","w"), indent=2, ensure_ascii=False)

print(f"pages {spec['totals']['pages']}  photo slots {tot_slots}  customer text fields {tot_text}")
print()
print(f"{'pg':>3}  {'photos':>6}  {'text':>4}  title")
for p in spec["pages"]:
    c=len([t for t in p['text_fields'] if t['role'].startswith('customer')])
    print(f"{p['index']:>3}  {p['photo_capacity']:>6}  {c:>4}  {p['title']}")
