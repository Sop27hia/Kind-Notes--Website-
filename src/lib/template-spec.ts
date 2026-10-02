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

export type PhotoSlot = Box & {
  id: string;
  kind: string;
  capacity: number;
  cells?: string[];
  templateAreas?: string[] | null;
  stroke?: number;
  strokeColor?: string;
  note?: string;
};

export type TextField = Box & {
  id: string;
  role: string;
  placeholder: string;
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
  photo_slots: PhotoSlot[];
  text_fields: TextField[];
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
