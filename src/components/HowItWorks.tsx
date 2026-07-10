import { ChooseIcon, PersonalizeIcon, ShipIcon } from "./icons/StepIcons";

const STEPS = [
  {
    icon: ChooseIcon,
    title: "Kies je magazine",
    description:
      "Begin met het Birthday Magazine en kies een cover-stijl die bij de jarige past.",
  },
  {
    icon: PersonalizeIcon,
    title: "Personaliseer met foto's & tekst",
    description:
      "Upload foto's per rubriek, schrijf persoonlijke boodschappen en zie meteen hoe elke pagina eruit gaat zien.",
  },
  {
    icon: ShipIcon,
    title: "Wij maken en verzenden het",
    description:
      "We drukken je magazine op dik, mat papier en sturen het naar jouw adres of direct naar de ontvanger.",
  },
];

export default function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
            Hoe het werkt
          </p>
          <h2 className="mt-3 font-serif text-3xl italic text-ink sm:text-4xl">
            In drie simpele stappen
          </h2>
        </div>

        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent-deep/40 bg-accent/25 text-ink">
                <step.icon className="h-7 w-7" />
              </div>
              <p className="mt-5 font-script text-2xl text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-serif text-xl text-ink">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
