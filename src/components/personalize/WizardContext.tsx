"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  INITIAL_WIZARD_DATA,
  WIZARD_STORAGE_KEY,
  type PhotoValue,
  type ShippingInfo,
  type WizardData,
} from "@/lib/wizard-types";

type Action =
  | { type: "SET_COVER_STYLE"; style: "dark" | "light" }
  | { type: "SET_PHOTO"; slotId: string; photo: PhotoValue }
  | { type: "UPDATE_PHOTO_TRANSFORM"; slotId: string; x: number; y: number; scale: number }
  | { type: "CLEAR_PHOTO"; slotId: string }
  | { type: "SET_TEXT"; fieldId: string; value: string }
  | { type: "SET_COPIES"; copies: number }
  | { type: "SET_SHIPPING"; shipping: Partial<ShippingInfo> }
  | { type: "RESET" }
  | { type: "HYDRATE"; data: WizardData };

function reducer(state: WizardData, action: Action): WizardData {
  switch (action.type) {
    case "SET_COVER_STYLE":
      return { ...state, coverStyle: action.style };
    case "SET_PHOTO":
      return {
        ...state,
        photos: { ...state.photos, [action.slotId]: action.photo },
      };
    case "UPDATE_PHOTO_TRANSFORM": {
      const existing = state.photos[action.slotId];
      if (!existing) return state;
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.slotId]: { ...existing, x: action.x, y: action.y, scale: action.scale },
        },
      };
    }
    case "CLEAR_PHOTO": {
      const next = { ...state.photos };
      delete next[action.slotId];
      return { ...state, photos: next };
    }
    case "SET_TEXT":
      return { ...state, texts: { ...state.texts, [action.fieldId]: action.value } };
    case "SET_COPIES":
      return { ...state, copies: Math.min(20, Math.max(1, action.copies)) };
    case "SET_SHIPPING":
      return { ...state, shipping: { ...state.shipping, ...action.shipping } };
    case "RESET":
      return INITIAL_WIZARD_DATA;
    case "HYDRATE":
      return action.data;
    default:
      return state;
  }
}

const WizardStateContext = createContext<WizardData | null>(null);
const WizardDispatchContext = createContext<Dispatch<Action> | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_WIZARD_DATA);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WIZARD_STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", data: JSON.parse(raw) as WizardData });
      }
    } catch {
      // corrupt or unavailable draft — start fresh
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage quota exceeded or unavailable — draft simply won't persist
    }
  }, [state]);

  return (
    <WizardStateContext.Provider value={state}>
      <WizardDispatchContext.Provider value={dispatch}>
        {children}
      </WizardDispatchContext.Provider>
    </WizardStateContext.Provider>
  );
}

export function useWizardState() {
  const ctx = useContext(WizardStateContext);
  if (!ctx) throw new Error("useWizardState must be used within WizardProvider");
  return ctx;
}

export function useWizardDispatch() {
  const ctx = useContext(WizardDispatchContext);
  if (!ctx) throw new Error("useWizardDispatch must be used within WizardProvider");
  return ctx;
}
