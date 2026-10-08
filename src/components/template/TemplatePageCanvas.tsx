import type { CSSProperties } from "react";
import {
  cellKey,
  customerText,
  gridCells,
  primary,
  scaleToWidth,
  TEMPLATE,
  type DecorItem,
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
  /** Keyed by slot id, or `slotId:cell` for one cell of a grid. */
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

const PLACEHOLDER_FILL = "rgba(127,127,127,.16)";
const PLACEHOLDER_LINE = "rgba(127,127,127,.6)";

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

function PlaceholderLabel({ s, text = "foto" }: { s: number; text?: string }) {
  return (
    <span
      className="pointer-events-none absolute inset-0 flex items-center justify-center text-center font-sans uppercase tracking-widest"
      style={{ fontSize: Math.max(6, 10 * s), color: PLACEHOLDER_LINE }}
    >
      {text}
    </span>
  );
}

/**
 * One photo frame: the leaf of both a plain slot and a grid cell.
 *
 * A Canva `shape` frame carries its own outline as an SVG path, so the frame
 * is drawn and clipped with that path rather than approximated by a rectangle.
 * Canva scales those paths nine-slice, keeping corner curves circular; this
 * stretches the viewBox instead, which is exact for the straight-edged frames
 * and slightly flattens the curve on rounded ones.
 */
function Frame({
  slot,
  src,
  s,
  style,
}: {
  slot: PhotoSlot;
  src?: string;
  s: number;
  style: CSSProperties;
}) {
  const stroke = slot.stroke ? slot.stroke * s : 0;

  if (slot.path) {
    const [minX, minY, vbW, vbH] = slot.path.viewBox;
    const clipId = `clip-${slot.id}`;
    // The path lives in viewBox units; a stroke given in design px has to be
    // converted, and the two axes scale differently under a stretch.
    const strokeW = slot.stroke ? (slot.stroke * vbW) / slot.w_px : 0;
    return (
      <div style={{ ...style, opacity: slot.opacity ?? 1 }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={slot.path.d} />
            </clipPath>
          </defs>
          {src ? (
            <image
              href={src}
              x={minX}
              y={minY}
              width={vbW}
              height={vbH}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
            />
          ) : (
            <path
              d={slot.path.d}
              fill={PLACEHOLDER_FILL}
              stroke={PLACEHOLDER_LINE}
              strokeWidth={Math.max(1, vbW / 200)}
              strokeDasharray={`${vbW / 60} ${vbW / 60}`}
            />
          )}
          {strokeW > 0 && (
            <path
              d={slot.path.d}
              fill="none"
              stroke={slot.strokeColor ?? "#000"}
              strokeWidth={strokeW}
            />
          )}
        </svg>
        {!src && <PlaceholderLabel s={s} />}
      </div>
    );
  }

  const frame: CSSProperties = {
    ...style,
    overflow: "hidden",
    opacity: slot.opacity ?? 1,
    ...(stroke ? { border: `${stroke}px solid ${slot.strokeColor ?? "#000"}` } : {}),
  };

  if (src) {
    return (
      <div style={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      style={{
        ...frame,
        ...(stroke ? {} : { border: `${Math.max(1, s * 2)}px dashed ${PLACEHOLDER_LINE}` }),
        background: PLACEHOLDER_FILL,
      }}
    >
      <PlaceholderLabel s={s} />
    </div>
  );
}

/**
 * A Canva grid: one element holding several cells laid out by `templateAreas`.
 * The gutter is not exposed by Canva's API — the value in the spec was
 * measured off two renders of page 4.
 */
function Grid({ slot, photos, s }: { slot: PhotoSlot; photos: PageContent["photos"]; s: number }) {
  const cells = gridCells(slot);
  const areas = slot.templateAreas;

  return (
    <div
      style={{
        ...boxStyle(slot, s),
        display: "grid",
        gap: TEMPLATE.page.grid_gap_px * s,
        ...(areas?.length
          ? { gridTemplateAreas: areas.map((row) => `"${row}"`).join(" ") }
          : { gridTemplateColumns: `repeat(${cells.length}, 1fr)` }),
      }}
    >
      {cells.map((cell) => (
        <Frame
          key={cell}
          slot={slot}
          src={photos?.[cellKey(slot, cell)]}
          s={s}
          style={{ position: "relative", gridArea: areas?.length ? cell : undefined }}
        />
      ))}
    </div>
  );
}

function Text({ field, value, s }: { field: TextField; value?: string; s: number }) {
  return (
    <div
      style={{
        ...boxStyle(field, s),
        fontFamily: fontFor(field.fontRef),
        fontSize: primary(field.fontSize) * s,
        lineHeight: field.lineHeight ?? 1.4,
        letterSpacing: field.letterSpacing ? `${field.letterSpacing}em` : undefined,
        color: field.color ?? "#000",
        textAlign: (field.align === "start"
          ? "left"
          : field.align === "end"
            ? "right"
            : field.align) as CSSProperties["textAlign"],
        fontStyle: field.fontStyle === "italic" ? "italic" : undefined,
        fontWeight: field.fontWeight === "normal" ? undefined : 700,
        opacity: field.opacity ?? 1,
        whiteSpace: "pre-wrap",
        overflow: "visible",
      }}
    >
      {value ?? field.placeholder}
    </div>
  );
}

/** Where a piece of fixed artwork belongs, until the art itself is exported. */
function DecorGhost({ item, s }: { item: DecorItem; s: number }) {
  return (
    <div
      style={{
        ...boxStyle(item, s),
        border: `1px dashed rgba(220,80,160,.45)`,
        background: "rgba(220,80,160,.06)",
      }}
    />
  );
}

export default function TemplatePageCanvas({
  page,
  content = {},
  width = 420,
  showSlotOutlines = false,
  showDecor = false,
}: {
  page: TemplatePage;
  content?: PageContent;
  width?: number;
  showSlotOutlines?: boolean;
  /** Outline the artwork that has not been exported from Canva yet. */
  showDecor?: boolean;
}) {
  const s = scaleToWidth(width);
  const height = TEMPLATE.page.height_px * s;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        background: page.background,
        overflow: "hidden",
      }}
      className="shadow-[0_10px_30px_-14px_rgba(0,0,0,0.45)]"
    >
      {page.photo_slots.map((slot) =>
        slot.cells?.length ? (
          <Grid key={slot.id} slot={slot} photos={content.photos} s={s} />
        ) : (
          <Frame
            key={slot.id}
            slot={slot}
            src={content.photos?.[slot.id]}
            s={s}
            style={boxStyle(slot, s)}
          />
        ),
      )}
      {page.text_fields.map((field) => (
        <Text key={field.id} field={field} value={content.texts?.[field.id]} s={s} />
      ))}
      {showDecor && page.decor.map((item) => <DecorGhost key={item.id} item={item} s={s} />)}
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
