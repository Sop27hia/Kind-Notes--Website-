import type { PageTemplate } from "@/lib/magazine-templates";
import { COVER_STYLES } from "@/lib/magazine-templates";
import type { PhotoValue, WizardData } from "@/lib/wizard-types";

function PagePhoto({
  photo,
  className = "",
  grayscale = true,
}: {
  photo: PhotoValue | undefined;
  className?: string;
  grayscale?: boolean;
}) {
  if (!photo) {
    return (
      <div
        className={`film-grain flex items-center justify-center bg-stone-light/50 ${className}`}
      >
        <span className="font-sans text-[10px] uppercase tracking-widest text-stone">
          foto
        </span>
      </div>
    );
  }
  return (
    <div className={`film-grain overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt=""
        className={`h-full w-full object-cover ${grayscale ? "grayscale contrast-110" : ""}`}
        style={{
          objectPosition: `${50 + photo.x}% ${50 + photo.y}%`,
          transform: `scale(${photo.scale})`,
        }}
      />
    </div>
  );
}

export default function MagazinePagePreview({
  template,
  photos,
  texts,
  coverStyle,
  pageNumber,
  className = "",
}: {
  template: PageTemplate;
  photos: WizardData["photos"];
  texts: WizardData["texts"];
  coverStyle: WizardData["coverStyle"];
  pageNumber?: number;
  className?: string;
}) {
  const t = (id: string, fallback = "") => texts[id]?.trim() || fallback;
  const style = COVER_STYLES.find((c) => c.id === coverStyle)!;

  const base = `relative w-full aspect-[21/27] overflow-hidden shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)] ${className}`;

  if (template.layout === "cover") {
    const photo = photos["cover-photo"];
    return (
      <div className={base} style={{ background: style.gradient }}>
        {photo && (
          <PagePhoto photo={photo} className="absolute inset-0 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />
        <div className="absolute inset-x-0 top-5 flex justify-center">
          <span
            className="font-script text-3xl sm:text-4xl"
            style={{ color: photo ? "#fdf9f2" : style.ink }}
          >
            {t("cover-title", "Happy Birthday")}
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-5">
          <p
            className="font-serif text-2xl italic leading-tight sm:text-3xl"
            style={{ color: photo ? "#fdf9f2" : style.ink }}
          >
            {t("cover-name", "Naam van de jarige")}
          </p>
          <p
            className="mt-1 font-sans text-[11px] uppercase tracking-[0.2em] opacity-80"
            style={{ color: photo ? "#fdf9f2" : style.ink }}
          >
            {t("cover-date", "Datum · Special Edition")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${base} bg-paper`}>
      <div className="flex h-full w-full flex-col p-4 sm:p-5">
        <PageHeader template={template} pageNumber={pageNumber} />

        {template.layout === "collage" && (
          <div className="mt-3 grid flex-1 grid-cols-3 gap-1.5">
            <PagePhoto photo={photos["memory-1"]} className="col-span-1 row-span-1" />
            <PagePhoto photo={photos["memory-2"]} className="col-span-1 row-span-2" />
            <PagePhoto photo={photos["memory-3"]} className="col-span-1 row-span-1" />
            <PagePhoto photo={photos["memory-4"]} className="col-span-1 row-span-1" />
            <PagePhoto photo={photos["memory-5"]} className="col-span-1 row-span-1" />
          </div>
        )}

        {template.layout === "message" && (
          <div className="mt-3 grid flex-1 grid-cols-5 gap-3">
            <PagePhoto photo={photos["wishes-photo"]} className="col-span-2 h-full" />
            <div className="col-span-3 flex flex-col justify-center">
              <p className="font-script text-2xl leading-snug text-ink-soft">
                {t("wishes-message", "Lieve jarige, wat fijn dat jij er bent...")}
              </p>
              <p className="mt-3 font-serif text-sm italic text-stone">
                — {t("wishes-from", "Van iemand die om je geeft")}
              </p>
            </div>
          </div>
        )}

        {template.layout === "bio" && (
          <div className="mt-3 grid flex-1 grid-cols-5 gap-3">
            <PagePhoto photo={photos["bio-photo"]} className="col-span-2 h-full" />
            <div className="col-span-3 space-y-2.5">
              <BioRow label="Wordt" value={t("bio-age", "— jaar")} />
              <BioRow label="Superkracht" value={t("bio-superpower", "...")} />
              <BioRow label="Lijfspreuk" value={t("bio-quote", "...")} italic />
              <BioRow label="Weetje" value={t("bio-fact", "...")} />
            </div>
          </div>
        )}

        {template.layout === "list" && (
          <div className="mt-3 grid flex-1 grid-cols-5 gap-3">
            <ol className="col-span-3 space-y-1.5 font-sans text-[11px] leading-snug text-ink-soft">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="font-script text-base leading-none text-accent-deep">
                    {n}.
                  </span>
                  <span className="pt-0.5">{t(`top10-reason-${n}`, "...")}</span>
                </li>
              ))}
            </ol>
            <PagePhoto photo={photos["top10-photo"]} className="col-span-2 h-full" />
          </div>
        )}

        {template.layout === "grid" && (
          <div className="mt-3 grid flex-1 grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-col gap-1">
                <PagePhoto photo={photos[`loves-${n}`]} className="flex-1" />
                <p className="text-center font-sans text-[10px] text-ink-soft">
                  {t(`loves-${n}-label`, "...")}
                </p>
              </div>
            ))}
          </div>
        )}

        {template.layout === "closing" && (
          <div className="relative mt-3 flex-1 overflow-hidden">
            <PagePhoto photo={photos["closing-photo"]} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/5" />
            <div className="absolute inset-x-4 bottom-4">
              <p className="font-script text-2xl leading-snug text-cream">
                {t("closing-message", "Op nog vele mooie jaren...")}
              </p>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-cream/80">
                {t("closing-signature", "Met liefde")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PageHeader({ template, pageNumber }: { template: PageTemplate; pageNumber?: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-ink/10 pb-2">
      <h3 className="font-serif text-base italic text-ink sm:text-lg">{template.name}</h3>
      {pageNumber !== undefined && (
        <span className="font-sans text-[10px] text-stone">{String(pageNumber).padStart(2, "0")}</span>
      )}
    </div>
  );
}

function BioRow({ label, value, italic }: { label: string; value: string; italic?: boolean }) {
  return (
    <div>
      <p className="font-sans text-[9px] uppercase tracking-widest text-stone">{label}</p>
      <p className={`font-serif text-sm text-ink-soft ${italic ? "italic" : ""}`}>{value}</p>
    </div>
  );
}
