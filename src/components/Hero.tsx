import Link from "next/link";
import VintagePhoto from "./VintagePhoto";
import PhotoboothStrip from "./PhotoboothStrip";
import { ArrowRightIcon } from "./icons/StepIcons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="animate-fade-up order-2 lg:order-1">
          <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
            Gepersonaliseerde verjaardagsmagazines
          </p>
          <h1 className="font-serif text-4xl italic leading-[1.15] text-ink sm:text-5xl lg:text-[3.4rem]">
            Maak een magazine vol
            <br />
            <span className="font-script not-italic text-accent-deep">
              herinneringen
            </span>{" "}
            voor iemand
            <br />
            die je lief hebt
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink-soft">
            Verzamel foto&apos;s, boodschappen en dierbare momenten van iedereen die
            om diegene geeft — wij drukken het als een echt tijdschrift, klaar
            om te bewaren.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/personaliseer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-sans text-sm font-medium text-ink transition-all hover:scale-[1.03] hover:bg-accent-deep"
            >
              Begin met personaliseren
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#voorbeelden"
              className="font-sans text-sm font-medium text-ink-soft underline decoration-stone-light underline-offset-4 transition-colors hover:text-ink hover:decoration-accent-deep"
            >
              Bekijk voorbeeld
            </Link>
          </div>
        </div>

        <div className="animate-fade-up order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <VintagePhoto
              variant={3}
              className="h-[420px] w-[300px] rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] sm:h-[480px] sm:w-[340px]"
              caption="voor jou, altijd"
            />
            <div className="absolute -bottom-8 -left-10 hidden sm:block">
              <PhotoboothStrip />
            </div>
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/90 blur-[1px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
