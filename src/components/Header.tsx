import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="font-script text-3xl leading-none text-ink">
          Kind Notes
        </Link>

        <nav className="hidden items-center gap-8 font-sans text-sm tracking-wide text-ink-soft md:flex">
          <Link href="/#magazine" className="transition-colors hover:text-ink">
            Birthday Magazine
          </Link>
          <Link href="/#hoe-werkt-het" className="transition-colors hover:text-ink">
            Hoe het werkt
          </Link>
          <Link href="/#voorbeelden" className="transition-colors hover:text-ink">
            Voorbeelden
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-ink">
            FAQ
          </Link>
        </nav>

        <Link
          href="/personaliseer"
          className="rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-medium text-ink transition-transform hover:scale-[1.03] hover:bg-accent-deep"
        >
          Begin met personaliseren
        </Link>
      </div>
    </header>
  );
}
