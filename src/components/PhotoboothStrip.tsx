import VintagePhoto from "./VintagePhoto";

const VARIANTS: (1 | 2 | 3 | 4 | 5 | 6)[] = [2, 5, 1, 4];

export default function PhotoboothStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-fit rotate-[-3deg] bg-charcoal p-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex flex-col gap-2">
        {VARIANTS.map((v, i) => (
          <VintagePhoto key={i} variant={v} className="h-24 w-32 sm:h-28 sm:w-40" />
        ))}
      </div>
      <p className="pt-2 text-center font-script text-lg text-cream/80">kind notes</p>
    </div>
  );
}
