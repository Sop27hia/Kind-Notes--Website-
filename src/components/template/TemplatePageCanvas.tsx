import type { CSSProperties } from "react";
import {
  customerText,
  primary,
  scaleToWidth,
  TEMPLATE,
  type PhotoSlot,
  type TemplatePage,
  type TextField,
} from "@/lib/template-spec";

/**
 * Renders one magazine page from the extracted Canva geometry.
 *
 * Every element is positioned from the spec's design pixels multiplied by a
 * single scale factor, so the canvas is the same layout at any size and stays
 * tied to the master rather than to hand-written CSS.
 */

export type PageContent = {
  photos?: Record<string, string>;
  texts?: Record<string, string>;
};

/**
 * Canva font refs mapped to the closest available web faces. These are
 * stand-ins: the real families have not been identified or licensed yet, so
 * type will not match the printed page until they are.
 */
const FONT_STACK: Record<string, string> = {
  "YAF3ubalrAg": "var(--font-script), cursive",
  "YALBszUSD-E": "var(--font-body-italic), Georgia, serif",
  "YAFcfq7XuZE": "var(--font-display-italic), Georgia, serif",
  "YAGL3riVrnU": "var(--font-hand), cursive",
  "YAFdJpOISlU": "var(--font-masthead), Georgia, serif",
};

function fontFor(ref: string | string[]): string {
  const key = primary(ref).split(",")[0];
  return FONT_STACK[key] ?? "Georgia, serif";
}

function boxStyle(
  el: { x_px: number; y_px: number; w_px: number; h_px: number; rotation_deg?: number },
  s: number,
): CSSProperties {
  return {
    position: "absolute",
    left: el.x_px * s,
    top: el.y_px * s,
    width: el.w_px * s,
    height: el.h_px * s,
    ...(el.rotation_deg
      ? { transform: `rotate(${el.rotation_deg}deg)`, transformOrigin: "center center" }
      : {}),
  };
}

function Slot({ slot, src, s }: { slot: PhotoSlot; src?: string; s: number }) {
  const style = boxStyle(slot, s);
  if (!src) {
    return (
      <div
        style={{ ...style, border: `${Math.max(1, s * 2)}px dashed rgba(0,0,0,.28)` }}
        className="flex items-center justify-center bg-black/[.03]"
      >
        <span
          className="font-sans uppercase tracking-widest text-black/40"
          style={{ fontSize: Math.max(7, 11 * s) }}
        >
          foto
        </span>
      </div>
    );
  }
  return (
    <div style={{ ...style, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function Text({ field, value, s }: { field: TextField; value?: string; s: number }) {
  const size = primary(field.fontSize) * s;
  return (
    <div
      style={{
        ...boxStyle(field, s),
        fontFamily: fontFor(field.fontRef),
        fontSize: size,
        lineHeight: field.lineHeight ?? 1.4,
        letterSpacing: field.letterSpacing ? `${field.letterSpacing}em` : undefined,
        color: field.color ?? "#000",
        textAlign: (field.align === "start"
          ? "left"
          : field.align === "end"
            ? "right"
            : field.align) as CSSProperties["textAlign"],
        fontStyle: field.fontStyle === "italic" ? "italic" : undefined,
        fontWeight: field.fontWeight === "bold" ? 700 : undefined,
        opacity: field.opacity ?? 1,
        overflow: "visible",
      }}
    >
      {value ?? field.placeholder}
    </div>
  );
}

export default function TemplatePageCanvas({
  page,
  content = {},
  width = 420,
  showSlotOutlines = false,
}: {
  page: TemplatePage;
  content?: PageContent;
  width?: number;
  showSlotOutlines?: boolean;
}) {
  const s = scaleToWidth(width);
  const height = TEMPLATE.page.height_px * s;

  return (
    <div
      style={{ position: "relative", width, height, background: page.background }}
      className="shadow-[0_10px_30px_-14px_rgba(0,0,0,0.45)]"
    >
      {page.photo_slots.map((slot) => (
        <Slot key={slot.id} slot={slot} src={content.photos?.[slot.id]} s={s} />
      ))}
      {page.text_fields.map((field) => (
        <Text key={field.id} field={field} value={content.texts?.[field.id]} s={s} />
      ))}
      {showSlotOutlines &&
        customerText(page).map((field) => (
          <div
            key={`o-${field.id}`}
            style={{ ...boxStyle(field, s), outline: "1px solid rgba(255,60,160,.9)" }}
          />
        ))}
    </div>
  );
}
