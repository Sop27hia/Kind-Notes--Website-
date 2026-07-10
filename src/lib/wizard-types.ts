export type PhotoValue = {
  src: string;
  x: number;
  y: number;
  scale: number;
};

export type ShippingInfo = {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  sendToRecipient: boolean;
  recipientName: string;
  recipientAddress: string;
  recipientPostalCode: string;
  recipientCity: string;
  giftNote: string;
  shippingOption: "standard" | "express";
};

export const EMPTY_SHIPPING: ShippingInfo = {
  fullName: "",
  email: "",
  address: "",
  postalCode: "",
  city: "",
  country: "Nederland",
  sendToRecipient: false,
  recipientName: "",
  recipientAddress: "",
  recipientPostalCode: "",
  recipientCity: "",
  giftNote: "",
  shippingOption: "standard",
};

export type WizardData = {
  coverStyle: "dark" | "light";
  photos: Record<string, PhotoValue | undefined>;
  texts: Record<string, string>;
  copies: number;
  shipping: ShippingInfo;
};

export const INITIAL_WIZARD_DATA: WizardData = {
  coverStyle: "dark",
  photos: {},
  texts: {},
  copies: 1,
  shipping: EMPTY_SHIPPING,
};

export const WIZARD_STORAGE_KEY = "kind-notes-birthday-magazine-draft";
