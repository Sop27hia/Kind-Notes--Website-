"use client";

import { BIRTHDAY_MAGAZINE_PAGES } from "@/lib/magazine-templates";
import MagazinePagePreview from "./MagazinePagePreview";
import { useWizardState } from "./WizardContext";

export default function StepReview({ onEditPage }: { onEditPage: (pageIndex: number) => void }) {
  const state = useWizardState();

  return (
    <div>
      <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
        Stap 4
      </p>
      <h2 className="mt-2 font-serif text-2xl italic text-ink sm:text-3xl">
        Overzicht van je magazine
      </h2>
      <p className="mt-2 max-w-md font-sans text-sm text-ink-soft">
        Controleer elke pagina voordat je verdergaat naar bestellen. Klik op een
        pagina om iets aan te passen.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {BIRTHDAY_MAGAZINE_PAGES.map((template, i) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onEditPage(i)}
            className="group text-left"
          >
            <MagazinePagePreview
              template={template}
              photos={state.photos}
              texts={state.texts}
              coverStyle={state.coverStyle}
              pageNumber={i + 1}
              className="rounded-sm transition-transform group-hover:-translate-y-1"
            />
            <p className="mt-2 font-sans text-xs text-ink-soft group-hover:text-ink">
              {template.name} · <span className="text-accent-deep underline">bewerk</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
