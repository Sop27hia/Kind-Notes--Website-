# Kind Notes

E-commerce site for Kind Notes — personalized magazines, cards and photobooks
for special occasions. Built with Next.js (App Router), TypeScript and
Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The personalization tool
lives at `/personaliseer`.

## Structure

- `src/app/page.tsx` — homepage (hero, how-it-works, product section, gallery)
- `src/app/personaliseer/page.tsx` — Birthday Magazine personalization wizard
- `src/components/personalize/` — wizard steps, photo upload/pan/zoom, live
  preview, shared state (`WizardContext`)
- `src/lib/products.ts` — product catalog, structured so future products
  (cards, photobooks) can be added alongside the Birthday Magazine
- `src/lib/magazine-templates.ts` — ordered page templates (cover, collage,
  message, bio, list, grid, closing) that drive the upload step, text step
  and live preview
- `src/components/VintagePhoto.tsx` / `PhotoboothStrip.tsx` — CSS/SVG-based
  grainy black-and-white placeholders standing in for real product photography

No backend is wired up yet — placing an order shows a confirmation screen
with a generated order number rather than persisting anything server-side.
