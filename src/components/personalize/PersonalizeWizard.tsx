"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BIRTHDAY_MAGAZINE_PAGES } from "@/lib/magazine-templates";
import { WizardProvider, useWizardDispatch } from "./WizardContext";
import StepCoverStyle from "./StepCoverStyle";
import StepPageEditor from "./StepPageEditor";
import StepReview from "./StepReview";
import StepOrder from "./StepOrder";
import OrderConfirmation from "./OrderConfirmation";
import { ArrowRightIcon } from "@/components/icons/StepIcons";

const PAGE_COUNT = BIRTHDAY_MAGAZINE_PAGES.length;
const STEP_COVER = 0;
const STEP_PAGES_START = 1;
const STEP_REVIEW = STEP_PAGES_START + PAGE_COUNT;
const STEP_ORDER = STEP_REVIEW + 1;
const TOTAL_STEPS = STEP_ORDER + 1;

function phaseLabel(step: number) {
  if (step === STEP_COVER) return "Cover-stijl";
  if (step >= STEP_PAGES_START && step < STEP_REVIEW)
    return `Pagina ${step - STEP_PAGES_START + 1} van ${PAGE_COUNT}`;
  if (step === STEP_REVIEW) return "Overzicht";
  return "Bestellen";
}

function WizardInner() {
  const [step, setStep] = useState(STEP_COVER);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const dispatch = useWizardDispatch();

  const progressPct = useMemo(() => ((step + 1) / TOTAL_STEPS) * 100, [step]);

  function goNext() {
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goPrev() {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goToPage(pageIndex: number) {
    setStep(STEP_PAGES_START + pageIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (orderNumber) {
    return <OrderConfirmation orderNumber={orderNumber} />;
  }

  return (
    <div>
      <div className="sticky top-0 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="font-script text-2xl text-ink">
            Kind Notes
          </Link>
          <span className="font-sans text-xs uppercase tracking-widest text-stone">
            {phaseLabel(step)}
          </span>
          <Link href="/" className="font-sans text-sm text-stone hover:text-ink">
            Sluiten
          </Link>
        </div>
        <div className="h-1 w-full bg-cream-dark">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
        {step === STEP_COVER && <StepCoverStyle />}

        {step >= STEP_PAGES_START && step < STEP_REVIEW && (
          <StepPageEditor
            template={BIRTHDAY_MAGAZINE_PAGES[step - STEP_PAGES_START]}
            index={step - STEP_PAGES_START + 1}
            total={PAGE_COUNT}
          />
        )}

        {step === STEP_REVIEW && <StepReview onEditPage={goToPage} />}

        {step === STEP_ORDER && (
          <StepOrder
            onPlaceOrder={() => {
              setOrderNumber(generateOrderNumber());
              dispatch({ type: "RESET" });
            }}
          />
        )}

        {step !== STEP_ORDER && (
          <div className="mt-12 flex items-center justify-between border-t border-ink/10 pt-6">
            <button
              type="button"
              onClick={goPrev}
              disabled={step === STEP_COVER}
              className="font-sans text-sm text-ink-soft transition-colors hover:text-ink disabled:opacity-0"
            >
              ← Vorige
            </button>
            <button
              type="button"
              onClick={goNext}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-sans text-sm font-medium text-ink transition-all hover:scale-[1.03] hover:bg-accent-deep"
            >
              {step === STEP_REVIEW ? "Ga naar bestellen" : "Volgende"}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function generateOrderNumber() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `KN-${rand}`;
}

export default function PersonalizeWizard() {
  return (
    <WizardProvider>
      <WizardInner />
    </WizardProvider>
  );
}
