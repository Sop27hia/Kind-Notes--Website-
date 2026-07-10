"use client";

import { COVER_STYLES } from "@/lib/magazine-templates";
import { useWizardDispatch, useWizardState } from "./WizardContext";

export default function StepCoverStyle() {
  const state = useWizardState();
  const dispatch = useWizardDispatch();

  return (
    <div>
      <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
        Stap 1
      </p>
      <h2 className="mt-2 font-serif text-2xl italic text-ink sm:text-3xl">
        Kies een cover-stijl
      </h2>
      <p className="mt-2 max-w-md font-sans text-sm text-ink-soft">
        Deze bepaalt de sfeer van de voorkant. Je kunt dit later nog aanpassen.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {COVER_STYLES.map((style) => {
          const selected = state.coverStyle === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => dispatch({ type: "SET_COVER_STYLE", style: style.id })}
              className={`group text-left focus:outline-none`}
            >
              <div
                className={`film-grain relative aspect-[21/27] w-full overflow-hidden rounded-sm border-2 transition-all ${
                  selected
                    ? "border-accent-deep shadow-[0_16px_36px_-16px_rgba(0,0,0,0.4)]"
                    : "border-transparent shadow-[0_8px_20px_-14px_rgba(0,0,0,0.3)] group-hover:border-stone-light"
                }`}
                style={{ background: style.gradient }}
              >
                <div className="absolute inset-x-0 top-6 flex justify-center">
                  <span className="font-script text-3xl" style={{ color: style.ink }}>
                    Happy Birthday
                  </span>
                </div>
                {selected && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] text-ink">
                    ✓
                  </span>
                )}
              </div>
              <p className="mt-3 font-serif text-lg text-ink">{style.name}</p>
              <p className="mt-1 font-sans text-sm text-ink-soft">{style.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
