import { Pinyon_Script, EB_Garamond, Cormorant_Garamond } from "next/font/google";

/**
 * Stand-ins for the ten Canva families in the master. None of the real faces
 * have been identified or licensed yet, so type on the canvas is close in
 * spirit but not yet the printed page.
 */
const script = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-script" });
const bodyItalic = EB_Garamond({ style: "italic", subsets: ["latin"], variable: "--font-body-italic" });
const displayItalic = Cormorant_Garamond({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-display-italic",
});
const masthead = EB_Garamond({ subsets: ["latin"], variable: "--font-masthead" });
const hand = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-hand" });

/** Apply to a wrapper around any TemplatePageCanvas. */
export const templateFontVars = [
  script.variable,
  bodyItalic.variable,
  displayItalic.variable,
  masthead.variable,
  hand.variable,
].join(" ");
