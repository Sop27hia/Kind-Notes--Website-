import Link from "next/link";

const FAQS = [
  {
    q: "Hoeveel foto's heb ik nodig?",
    a: "Voor een Birthday Magazine raden we minimaal 15 tot 20 foto's aan, verspreid over de verschillende rubrieken. Hoe meer beeldmateriaal, hoe voller je magazine aanvoelt — maar je kunt ook prima starten met minder.",
  },
  {
    q: "Kan ik het magazine tussentijds opslaan en later verder gaan?",
    a: "Ja. Je voortgang wordt automatisch bewaard in je browser, zodat je rustig kunt schakelen tussen foto's zoeken en teksten schrijven.",
  },
  {
    q: "Hoe lang duurt de levering?",
    a: "Na het plaatsen van je bestelling wordt je magazine binnen 2 werkdagen gedrukt en verstuurd. Levering duurt gemiddeld 2 tot 4 werkdagen binnen Nederland en België.",
  },
  {
    q: "Kan ik het magazine rechtstreeks naar de ontvanger laten sturen?",
    a: "Zeker — bij het afronden van je bestelling kun je kiezen tussen verzenden naar jouw eigen adres of direct naar de jarige, eventueel met een verrassingsboodschap op de envelop.",
  },
  {
    q: "Van welk materiaal is het magazine gemaakt?",
    a: "Elk magazine wordt gedrukt op dik, mat 170 grams papier met een stevige omslag — het voelt echt als een tijdschrift, gemaakt om te bewaren.",
  },
];

export default function Footer() {
  return (
    <footer id="faq" className="border-t border-ink/10 bg-charcoal text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-script text-4xl text-cream">Kind Notes</p>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              Magazines vol herinneringen, gemaakt van jouw foto&apos;s en woorden —
              voor de mensen die je het liefst in de watten legt.
            </p>
            <div className="mt-6 flex gap-4">
              {["Instagram", "Pinterest", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-sans text-xs uppercase tracking-widest text-cream/60 transition-colors hover:text-accent"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Contact</h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-cream/70">
              <li>hallo@kindnotes.nl</li>
              <li>+31 20 123 4567</li>
              <li>Ma–Vr, 9:00–17:00</li>
            </ul>
            <h3 className="mt-8 font-serif text-lg text-cream">Winkel</h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-cream/70">
              <li>
                <Link href="/#magazine" className="hover:text-accent">
                  Birthday Magazine
                </Link>
              </li>
              <li className="text-cream/40">Kaarten — binnenkort</li>
              <li className="text-cream/40">Fotoboeken — binnenkort</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Veelgestelde vragen</h3>
            <div className="mt-4 divide-y divide-cream/10 border-t border-cream/10">
              {FAQS.map((item) => (
                <details key={item.q} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-sm text-cream/85 marker:content-none">
                    {item.q}
                    <span className="ml-4 shrink-0 font-serif text-lg text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-cream/55">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 font-sans text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Kind Notes. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream/70">
              Privacybeleid
            </a>
            <a href="#" className="hover:text-cream/70">
              Voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
