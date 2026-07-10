import Link from "next/link";
import { HeartIcon } from "@/components/icons/StepIcons";

export default function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="mx-auto max-w-lg py-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/25 text-accent-deep">
        <HeartIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-serif text-3xl italic text-ink">Bedankt voor je bestelling</h2>
      <p className="mt-3 font-sans text-sm text-ink-soft">
        Bestelnummer <span className="font-medium text-ink">{orderNumber}</span>. We
        beginnen meteen met het drukken van je magazine — je ontvangt een
        bevestiging per e-mail zodra het onderweg is.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-sans text-sm font-medium text-ink transition-all hover:scale-[1.03] hover:bg-accent-deep"
      >
        Terug naar de homepage
      </Link>
    </div>
  );
}
