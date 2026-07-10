import VintagePhoto from "./VintagePhoto";

const TILES: { variant: 1 | 2 | 3 | 4 | 5 | 6; caption?: string; tall?: boolean }[] = [
  { variant: 2, caption: "memories of us", tall: true },
  { variant: 5 },
  { variant: 1, caption: "who is that girl" },
  { variant: 4, tall: true },
  { variant: 6, caption: "wishes" },
  { variant: 3 },
];

export default function Gallery() {
  return (
    <section id="voorbeelden" className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-lg">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
            Eerder gemaakt
          </p>
          <h2 className="mt-3 font-serif text-3xl italic text-ink sm:text-4xl">
            Een greep uit eerdere magazines
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft">
            Elk magazine is anders — omdat elk verhaal anders is. Dit is de sfeer
            waarin we werken: analoog, warm en net iets echter dan perfect.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {TILES.map((tile, i) => (
            <VintagePhoto
              key={i}
              variant={tile.variant}
              caption={tile.caption}
              className={`rounded-sm ${tile.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
