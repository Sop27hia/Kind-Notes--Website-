export type PhotoSlot = {
  id: string;
  label: string;
  aspect: "portrait" | "square" | "landscape";
};

export type TextField = {
  id: string;
  label: string;
  placeholder: string;
  maxLength: number;
  multiline?: boolean;
};

export type PageLayout =
  | "cover"
  | "collage"
  | "message"
  | "bio"
  | "list"
  | "grid"
  | "closing";

export type PageTemplate = {
  id: string;
  layout: PageLayout;
  name: string;
  description: string;
  photoSlots: PhotoSlot[];
  textFields: TextField[];
};

export type CoverStyle = {
  id: "dark" | "light";
  name: string;
  description: string;
  gradient: string;
  ink: string;
};

export const COVER_STYLES: CoverStyle[] = [
  {
    id: "dark",
    name: "Donker & dramatisch",
    description: "Zwart-wit, filmisch contrast — een cover die opvalt op de plank.",
    gradient:
      "radial-gradient(circle at 35% 15%, #4a4741 0%, #201e1b 45%, #060605 100%)",
    ink: "#f6f0e6",
  },
  {
    id: "light",
    name: "Licht & romantisch",
    description: "Zachte crème-tinten en een vleugje roze — luchtig en intiem.",
    gradient:
      "radial-gradient(circle at 35% 15%, #fbf3ea 0%, #ece2cf 55%, #d9cdb4 100%)",
    ink: "#1c1a17",
  },
];

/**
 * Ordered page templates for the Birthday Magazine flow.
 * Each entry drives both the photo-upload step and the text step in the
 * personalization wizard, plus the live preview render.
 */
export const BIRTHDAY_MAGAZINE_PAGES: PageTemplate[] = [
  {
    id: "cover",
    layout: "cover",
    name: "Cover",
    description: "De voorkant van het magazine — kies de hoofdfoto en titel.",
    photoSlots: [{ id: "cover-photo", label: "Hoofdfoto", aspect: "portrait" }],
    textFields: [
      {
        id: "cover-title",
        label: "Titel",
        placeholder: "Happy Birthday",
        maxLength: 40,
      },
      {
        id: "cover-name",
        label: "Naam van de jarige",
        placeholder: "Sophie",
        maxLength: 30,
      },
      {
        id: "cover-date",
        label: "Datum / editie",
        placeholder: "10 juli 2026 · Special Edition",
        maxLength: 40,
      },
    ],
  },
  {
    id: "memories-of-us",
    layout: "collage",
    name: "Memories of us",
    description: "Een fotocollage vol jullie mooiste samen-momenten.",
    photoSlots: [
      { id: "memory-1", label: "Foto 1", aspect: "square" },
      { id: "memory-2", label: "Foto 2", aspect: "portrait" },
      { id: "memory-3", label: "Foto 3", aspect: "landscape" },
      { id: "memory-4", label: "Foto 4", aspect: "square" },
      { id: "memory-5", label: "Foto 5", aspect: "portrait" },
    ],
    textFields: [
      {
        id: "memories-caption",
        label: "Bijschrift",
        placeholder: "Al jaren onafscheidelijk...",
        maxLength: 120,
        multiline: true,
      },
    ],
  },
  {
    id: "wishes",
    layout: "message",
    name: "Wishes",
    description: "Persoonlijke verjaardagswensen van dierbaren.",
    photoSlots: [{ id: "wishes-photo", label: "Sfeerfoto", aspect: "portrait" }],
    textFields: [
      {
        id: "wishes-from",
        label: "Van",
        placeholder: "Papa & Mama",
        maxLength: 30,
      },
      {
        id: "wishes-message",
        label: "Boodschap",
        placeholder: "Lieve Sophie, wat ben je toch een bijzonder mens...",
        maxLength: 400,
        multiline: true,
      },
    ],
  },
  {
    id: "who-is-that-girl",
    layout: "bio",
    name: "Who is that girl",
    description: "Een speelse bio-pagina vol weetjes.",
    photoSlots: [{ id: "bio-photo", label: "Portret", aspect: "portrait" }],
    textFields: [
      { id: "bio-age", label: "Wordt", placeholder: "30 jaar", maxLength: 20 },
      {
        id: "bio-superpower",
        label: "Superkracht",
        placeholder: "Overal vrienden maken",
        maxLength: 60,
      },
      {
        id: "bio-quote",
        label: "Lijfspreuk",
        placeholder: "“Geniet van elk moment”",
        maxLength: 80,
      },
      {
        id: "bio-fact",
        label: "Weetje",
        placeholder: "Kan geen goed liedje laten liggen zonder mee te zingen",
        maxLength: 120,
        multiline: true,
      },
    ],
  },
  {
    id: "top-10",
    layout: "list",
    name: "Top 10 reasons why",
    description: "Tien redenen waarom zij zo bijzonder is.",
    photoSlots: [{ id: "top10-photo", label: "Foto naast de lijst", aspect: "portrait" }],
    textFields: Array.from({ length: 10 }, (_, i) => ({
      id: `top10-reason-${i + 1}`,
      label: `Reden ${i + 1}`,
      placeholder: "Omdat je altijd weet hoe je een dag beter maakt",
      maxLength: 90,
    })),
  },
  {
    id: "things-she-loves",
    layout: "grid",
    name: "Things she loves",
    description: "Een grid van de kleine dingen die haar gelukkig maken.",
    photoSlots: [
      { id: "loves-1", label: "Foto 1", aspect: "square" },
      { id: "loves-2", label: "Foto 2", aspect: "square" },
      { id: "loves-3", label: "Foto 3", aspect: "square" },
      { id: "loves-4", label: "Foto 4", aspect: "square" },
    ],
    textFields: [
      { id: "loves-1-label", label: "Bijschrift 1", placeholder: "Zondagochtend koffie", maxLength: 40 },
      { id: "loves-2-label", label: "Bijschrift 2", placeholder: "Lange strandwandelingen", maxLength: 40 },
      { id: "loves-3-label", label: "Bijschrift 3", placeholder: "Haar hondje Otis", maxLength: 40 },
      { id: "loves-4-label", label: "Bijschrift 4", placeholder: "Vinyl op zondag", maxLength: 40 },
    ],
  },
  {
    id: "closing",
    layout: "closing",
    name: "Laatste pagina",
    description: "Een laatste warme boodschap om het magazine af te sluiten.",
    photoSlots: [{ id: "closing-photo", label: "Slotfoto", aspect: "landscape" }],
    textFields: [
      {
        id: "closing-message",
        label: "Afsluitende boodschap",
        placeholder: "Op nog vele jaren vol mooie herinneringen...",
        maxLength: 200,
        multiline: true,
      },
      {
        id: "closing-signature",
        label: "Ondertekening",
        placeholder: "Met liefde, je vrienden en familie",
        maxLength: 60,
      },
    ],
  },
];
