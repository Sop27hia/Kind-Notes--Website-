"use client";

import type { PageTemplate } from "@/lib/magazine-templates";
import PhotoDropzone from "./PhotoDropzone";
import MagazinePagePreview from "./MagazinePagePreview";
import { useWizardDispatch, useWizardState } from "./WizardContext";

export default function StepPageEditor({
  template,
  index,
  total,
}: {
  template: PageTemplate;
  index: number;
  total: number;
}) {
  const state = useWizardState();
  const dispatch = useWizardDispatch();

  return (
    <div>
      <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
        Pagina {index} van {total}
      </p>
      <h2 className="mt-2 font-serif text-2xl italic text-ink sm:text-3xl">{template.name}</h2>
      <p className="mt-2 max-w-md font-sans text-sm text-ink-soft">{template.description}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          {template.photoSlots.length > 0 && (
            <div>
              <h3 className="font-sans text-sm font-medium text-ink">Foto&apos;s</h3>
              <div
                className={`mt-3 grid gap-4 ${
                  template.photoSlots.length > 1 ? "sm:grid-cols-2" : "max-w-xs"
                }`}
              >
                {template.photoSlots.map((slot) => (
                  <PhotoDropzone
                    key={slot.id}
                    slot={slot}
                    value={state.photos[slot.id]}
                    onChange={(photo) => dispatch({ type: "SET_PHOTO", slotId: slot.id, photo })}
                    onClear={() => dispatch({ type: "CLEAR_PHOTO", slotId: slot.id })}
                  />
                ))}
              </div>
            </div>
          )}

          {template.textFields.length > 0 && (
            <div>
              <h3 className="font-sans text-sm font-medium text-ink">Tekst</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {template.textFields.map((field) => {
                  const value = state.texts[field.id] ?? "";
                  const full = field.multiline || template.textFields.length === 1;
                  return (
                    <label key={field.id} className={full ? "sm:col-span-2" : ""}>
                      <span className="font-sans text-xs text-stone">{field.label}</span>
                      {field.multiline ? (
                        <textarea
                          value={value}
                          maxLength={field.maxLength}
                          placeholder={field.placeholder}
                          onChange={(e) =>
                            dispatch({ type: "SET_TEXT", fieldId: field.id, value: e.target.value })
                          }
                          rows={3}
                          className="mt-1 w-full resize-none rounded-sm border border-ink/15 bg-paper px-3 py-2 font-sans text-sm text-ink placeholder:text-stone-light focus:border-accent-deep focus:outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          maxLength={field.maxLength}
                          placeholder={field.placeholder}
                          onChange={(e) =>
                            dispatch({ type: "SET_TEXT", fieldId: field.id, value: e.target.value })
                          }
                          className="mt-1 w-full rounded-sm border border-ink/15 bg-paper px-3 py-2 font-sans text-sm text-ink placeholder:text-stone-light focus:border-accent-deep focus:outline-none"
                        />
                      )}
                      <span className="mt-1 block text-right font-sans text-[10px] text-stone-light">
                        {value.length}/{field.maxLength}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 font-sans text-xs uppercase tracking-widest text-stone">
            Live preview
          </p>
          <MagazinePagePreview
            template={template}
            photos={state.photos}
            texts={state.texts}
            coverStyle={state.coverStyle}
            pageNumber={index}
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
