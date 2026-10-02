import { Pinyon_Script, EB_Garamond, Cormorant_Garamond } from "next/font/google";
import TemplatePageCanvas from "@/components/template/TemplatePageCanvas";
import { customerText, getPage, TEMPLATE } from "@/lib/template-spec";

const script = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-script" });
const bodyItalic = EB_Garamond({ style: "italic", subsets: ["latin"], variable: "--font-body-italic" });
const displayItalic = Cormorant_Garamond({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-display-italic",
});

export const metadata = {
  title: "Phase 0 — pagina 2",
};

/**
 * Phase 0: proves the editor canvas can be driven entirely from the geometry
 * extracted from the Canva master, with nothing hand-positioned.
 */
export default function Phase0Page() {
  const page = getPage(2);
  const filled = {
    texts: {
      LBl64tJTKWVf16Nm: "Sophie de Vries",
      LBWmfT2g2dN08Nw2: "14  maart  1998",
    },
  };

  return (
    <div
      className={`${script.variable} ${bodyItalic.variable} ${displayItalic.variable} min-h-screen bg-cream px-6 py-12`}
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-stone">Phase 0</p>
        <h1 className="mt-2 font-serif text-3xl italic text-ink">
          Pagina 2, opgebouwd uit de Canva-geometrie
        </h1>
        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-ink-soft">
          Niets op deze pagina is met de hand gepositioneerd. Elke doos komt uit{" "}
          <code className="text-ink">template-spec.json</code>, geschaald vanuit de
          ontwerp-pixels van het origineel.
        </p>

        <div className="mt-10 flex flex-wrap items-start gap-10">
          <figure>
            <TemplatePageCanvas page={page} width={380} />
            <figcaption className="mt-3 font-sans text-xs text-stone">Leeg — placeholders</figcaption>
          </figure>
          <figure>
            <TemplatePageCanvas page={page} content={filled} width={380} showSlotOutlines />
            <figcaption className="mt-3 font-sans text-xs text-stone">
              Ingevuld — roze kaders tonen de tekstvakken
            </figcaption>
          </figure>
        </div>

        <dl className="mt-12 grid max-w-xl grid-cols-[11rem_1fr] gap-x-6 gap-y-2 border-t border-ink/10 pt-6 font-sans text-sm">
          <dt className="text-stone">Paginaformaat</dt>
          <dd className="text-ink-soft">
            {TEMPLATE.page.width_mm} × {TEMPLATE.page.height_mm} mm ({TEMPLATE.page.width_px} ×{" "}
            {TEMPLATE.page.height_px} px)
          </dd>
          <dt className="text-stone">Afloop</dt>
          <dd className="text-ink-soft">{TEMPLATE.page.bleed_mm} mm</dd>
          <dt className="text-stone">Fotoplekken</dt>
          <dd className="text-ink-soft">{page.photo_slots.length}</dd>
          <dt className="text-stone">Tekstvelden klant</dt>
          <dd className="text-ink-soft">{customerText(page).length}</dd>
          <dt className="text-stone">Vaste decoratie</dt>
          <dd className="text-ink-soft">{page.fixed_decor_count}</dd>
        </dl>
      </div>
    </div>
  );
}
