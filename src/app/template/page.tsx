import TemplatePageCanvas from "@/components/template/TemplatePageCanvas";
import { templateFontVars } from "@/components/template/fonts";
import { customerText, photoKeys, TEMPLATE } from "@/lib/template-spec";

export const metadata = {
  title: "Template — alle 36 pagina's",
};

/**
 * Every page of the Birthday Magazine master, drawn from template-spec.json.
 * This is the proofing view for the renderer itself: if a page is wrong here,
 * it is wrong in the editor and wrong on press.
 */
export default function TemplateSheetPage() {
  const totalPhotos = TEMPLATE.pages.reduce((n, p) => n + photoKeys(p).length, 0);
  const totalText = TEMPLATE.pages.reduce((n, p) => n + customerText(p).length, 0);

  return (
    <div className={`${templateFontVars} min-h-screen bg-charcoal px-6 py-12 text-cream`}>
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-stone">Renderer-proef</p>
        <h1 className="mt-2 font-serif text-3xl italic">
          Alle {TEMPLATE.pages.length} pagina&apos;s uit de geometrie
        </h1>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-stone-light">
          {totalPhotos} fotoplekken en {totalText} klantteksten, allemaal gepositioneerd uit{" "}
          <code>template-spec.json</code>. Vormgeframes (hart, chevron, cirkels) missen nog hun
          clip-pad en staan daarom als rechthoek; vaste decoratie (tape, snippers, stock-art) is nog
          niet geëxporteerd uit Canva en ontbreekt dus volledig.
        </p>

        <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-6 gap-y-10">
          {TEMPLATE.pages.map((page) => (
            <figure key={page.index}>
              <TemplatePageCanvas page={page} width={230} showDecor />
              <figcaption className="mt-2 font-sans text-[11px] leading-snug text-stone">
                <span className="text-cream">{String(page.index).padStart(2, "0")}</span>{" "}
                {page.title || "—"}
                <br />
                {photoKeys(page).length} foto · {customerText(page).length} tekst
                {page.fixed_decor_count > 0 ? ` · ${page.fixed_decor_count} decor` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
