export type ProductCategory = "magazine" | "card" | "photobook";

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: "EUR";
  specs: ProductSpec[];
  rubrics: string[];
  available: boolean;
};

export const BIRTHDAY_MAGAZINE: Product = {
  id: "birthday-magazine",
  slug: "birthday-magazine",
  category: "magazine",
  name: "Birthday Magazine",
  tagline: "Een gepersonaliseerd tijdschrift vol foto's, boodschappen en herinneringen.",
  description:
    "Verzamel de mooiste foto's en liefste woorden van iedereen die om de jarige geeft, en wij maken er een echt tijdschrift van — compleet met cover, rubrieken en een persoonlijke opmaak.",
  price: 34.95,
  currency: "EUR",
  specs: [
    { label: "Pagina's", value: "24 pagina's" },
    { label: "Formaat", value: "21 × 27 cm" },
    { label: "Papier", value: "170 grams, mat" },
    { label: "Omslag", value: "Stevig, gelamineerd" },
    { label: "Levertijd", value: "2–4 werkdagen" },
  ],
  rubrics: [
    "Wishes — persoonlijke boodschappen van dierbaren",
    "Who is that girl — een speelse bio-pagina",
    "Memories of us — fotocollage vol samen-momenten",
    "Top 10 reasons why — een lijst om nooit te vergeten",
    "Things she loves — de kleine dingen die haar blij maken",
  ],
  available: true,
};

export const PRODUCTS: Product[] = [BIRTHDAY_MAGAZINE];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number, currency: Product["currency"] = "EUR") {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency }).format(amount);
}
