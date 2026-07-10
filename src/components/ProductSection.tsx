import Link from "next/link";
import VintagePhoto from "./VintagePhoto";
import { BIRTHDAY_MAGAZINE, formatPrice } from "@/lib/products";
import { ArrowRightIcon, HeartIcon } from "./icons/StepIcons";

export default function ProductSection() {
  const product = BIRTHDAY_MAGAZINE;

  return (
    <section id="magazine" className="bg-cream-dark/50 px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div className="relative flex justify-center">
          <VintagePhoto
            variant={4}
            className="h-[380px] w-[280px] -rotate-3 rounded-sm shadow-[0_25px_50px_-18px_rgba(0,0,0,0.4)] sm:h-[440px] sm:w-[320px]"
          />
          <VintagePhoto
            variant={6}
            className="absolute left-10 top-10 h-[380px] w-[280px] rotate-6 rounded-sm opacity-95 shadow-[0_25px_50px_-18px_rgba(0,0,0,0.4)] sm:h-[440px] sm:w-[320px]"
          />
        </div>

        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
            Het eerste product
          </p>
          <h2 className="mt-3 font-serif text-3xl italic text-ink sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <p className="mt-6 font-serif text-2xl text-ink">
            {formatPrice(product.price)}
            <span className="ml-2 font-sans text-sm font-normal text-stone">
              per exemplaar
            </span>
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 border-y border-ink/10 py-5 font-sans text-sm">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-3 sm:justify-start">
                <dt className="text-stone">{spec.label}</dt>
                <dd className="text-ink-soft">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <p className="font-sans text-sm font-medium text-ink">Wat erin zit</p>
            <ul className="mt-3 space-y-2.5">
              {product.rubrics.map((rubric) => (
                <li key={rubric} className="flex items-start gap-2.5 font-sans text-sm text-ink-soft">
                  <HeartIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-deep" />
                  {rubric}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/personaliseer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-sans text-sm font-medium text-ink transition-all hover:scale-[1.03] hover:bg-accent-deep"
            >
              Begin met personaliseren
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#voorbeelden"
              className="inline-flex items-center rounded-full border border-ink/15 px-7 py-3.5 font-sans text-sm font-medium text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
            >
              Bekijk voorbeeld
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
