import type { Metadata } from "next";
import PersonalizeWizard from "@/components/personalize/PersonalizeWizard";

export const metadata: Metadata = {
  title: "Personaliseer je Birthday Magazine — Kind Notes",
  description:
    "Kies een cover-stijl, upload foto's per rubriek en schrijf persoonlijke boodschappen — zie in real-time hoe je Birthday Magazine eruit gaat zien.",
};

export default function PersonalizePage() {
  return <PersonalizeWizard />;
}
