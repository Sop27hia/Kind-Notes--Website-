import spec from "../../assets/template/template-spec.json";

/**
 * Geometry extracted from the Canva master (" Birthday magazine template",
 * design DAG8FzG6gq8). Canva lays out at 96 px per inch, so one design pixel
 * is 25.4/96 mm. Both units are carried: the editor canvas scales the px, the
 * print path needs the mm.
 */

export type Box = {
  x_px: number;
  y_px: number;
  w_px: number;
  h_px: number;
  x_mm: number;
  y_mm: number;
  w_mm: number;
  h_mm: number;
  rotation_deg?: number;
};

/** A Canva shape frame's outline, in its own viewBox coordinates. */
export type SlotPath = {
  d: string;
  /** minX, minY, width, height */
  viewBox: [number, number, number, number];
};

export type PhotoSlot = Box & {
  id: string;
  kind: "grid" | "shape" | "rect" | string;
  capacity: number;
  cells?: string[];
  templateAreas?: string[] | null;
  cell_labels?: Record<string, string>;
  path?: SlotPath;
  stroke?: number;
  strokeColor?: string;
  opacity?: number;
  autofill_field_labels?: string[];
  note?: string;
};

/** Artwork baked into the master: tape, torn paper, film strips, stock props. */
export type DecorItem = Box & {
  id: string;
  kind: string;
  media_id?: string;
  text?: string;
};

export type TextField = Box & {
  id: string;
  role: string;
  placeholder: string;
  source_text?: string;
  fontSize: number | number[];
  fontRef: string | string[];
  color?: string;
  align?: string;
  fontWeight?: string;
  fontStyle?: string;
  lineHeight?: number;
  letterSpacing?: number;
  opacity?: number;
};

export type TemplatePage = {
  index: number;
  canva_page_id: string;
  title: string;
  background: string;
  photo_capacity: number;
  note?: string;
  photo_slots: PhotoSlot[];
  text_fields: TextField[];
  decor: DecorItem[];
  fixed_decor_count: number;
};

export type TemplateSpec = {
  source: { provider: string; design_id: string; title: string; page_count: number };
  page: {
    width_px: number;
    height_px: number;
    width_mm: number;
    height_mm: number;
    px_to_mm: number;
    trim_mm: { width: number; height: number };
    bleed_mm: number;
    /** Canva does not expose the grid gutter; this was measured off two renders. */
    grid_gap_px: number;
    grid_gap_mm: number;
  };
  totals: {
    photo_capacity: number;
    slot_elements: number;
    text_fields: number;
    decor_elements: number;
  };
  pages: TemplatePage[];
};

export const TEMPLATE = spec as unknown as TemplateSpec;

export function getPage(index: number): TemplatePage {
  const page = TEMPLATE.pages.find((p) => p.index === index);
  if (!page) throw new Error(`template page ${index} not found`);
  return page;
}

/** Customer-editable text only — headings and fixed numerals are not. */
export function customerText(page: TemplatePage): TextField[] {
  return page.text_fields.filter((t) => t.role.startsWith("customer"));
}

/** Scale factor to render a design-pixel page into a box `width` px wide. */
export function scaleToWidth(width: number): number {
  return width / TEMPLATE.page.width_px;
}

/** First font size / ref when an element carries several text regions. */
export function primary<T>(v: T | T[]): T {
  return Array.isArray(v) ? v[0] : v;
}

/**
 * Cell names of a grid slot, in the order `templateAreas` lays them out, so a
 * grid that names its areas and one that only counts cells both iterate the
 * same way.
 */
export function gridCells(slot: PhotoSlot): string[] {
  if (slot.templateAreas?.length) {
    const seen: string[] = [];
    for (const row of slot.templateAreas) {
      for (const name of row.split(/\s+/).filter(Boolean)) {
        if (name !== "." && !seen.includes(name)) seen.push(name);
      }
    }
    if (seen.length) return seen;
  }
  return slot.cells ?? [];
}

/** Content key for one cell of a grid slot. */
export function cellKey(slot: PhotoSlot, cell: string): string {
  return `${slot.id}:${cell}`;
}

/** Every fillable photo position on a page, grids expanded into their cells. */
export function photoKeys(page: TemplatePage): string[] {
  return page.photo_slots.flatMap((slot) =>
    slot.cells?.length ? gridCells(slot).map((c) => cellKey(slot, c)) : [slot.id],
  );
}
