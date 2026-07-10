"use client";

import { BIRTHDAY_MAGAZINE, formatPrice } from "@/lib/products";
import { useWizardDispatch, useWizardState } from "./WizardContext";

const SHIPPING_FEES = { standard: 4.95, express: 8.95 };

export default function StepOrder({ onPlaceOrder }: { onPlaceOrder: () => void }) {
  const state = useWizardState();
  const dispatch = useWizardDispatch();
  const { shipping, copies } = state;

  const subtotal = BIRTHDAY_MAGAZINE.price * copies;
  const shippingFee = SHIPPING_FEES[shipping.shippingOption];
  const total = subtotal + shippingFee;

  function setShipping(patch: Partial<typeof shipping>) {
    dispatch({ type: "SET_SHIPPING", shipping: patch });
  }

  return (
    <div>
      <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-stone">
        Stap 5
      </p>
      <h2 className="mt-2 font-serif text-2xl italic text-ink sm:text-3xl">
        Bestelling plaatsen
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPlaceOrder();
        }}
        className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-8">
          <fieldset>
            <legend className="font-sans text-sm font-medium text-ink">Jouw gegevens</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Volledige naam" required>
                <input
                  required
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ fullName: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="E-mailadres" required>
                <input
                  type="email"
                  required
                  value={shipping.email}
                  onChange={(e) => setShipping({ email: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Adres" required full>
                <input
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ address: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Postcode" required>
                <input
                  required
                  value={shipping.postalCode}
                  onChange={(e) => setShipping({ postalCode: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Plaats" required>
                <input
                  required
                  value={shipping.city}
                  onChange={(e) => setShipping({ city: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Land" required>
                <select
                  value={shipping.country}
                  onChange={(e) => setShipping({ country: e.target.value })}
                  className={inputClass}
                >
                  <option>Nederland</option>
                  <option>België</option>
                  <option>Duitsland</option>
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-sans text-sm font-medium text-ink">Verzendopties</legend>
            <label className="mt-3 flex items-start gap-2.5 font-sans text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={shipping.sendToRecipient}
                onChange={(e) => setShipping({ sendToRecipient: e.target.checked })}
                className="mt-0.5 accent-accent-deep"
              />
              Verstuur rechtstreeks naar de ontvanger in plaats van naar mijzelf
            </label>

            {shipping.sendToRecipient && (
              <div className="mt-4 grid gap-4 border-l-2 border-accent/50 pl-4 sm:grid-cols-2">
                <Field label="Naam ontvanger" required>
                  <input
                    required
                    value={shipping.recipientName}
                    onChange={(e) => setShipping({ recipientName: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Postcode" required>
                  <input
                    required
                    value={shipping.recipientPostalCode}
                    onChange={(e) => setShipping({ recipientPostalCode: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Adres" required full>
                  <input
                    required
                    value={shipping.recipientAddress}
                    onChange={(e) => setShipping({ recipientAddress: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Plaats" required>
                  <input
                    required
                    value={shipping.recipientCity}
                    onChange={(e) => setShipping({ recipientCity: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Verrassingsboodschap (optioneel)" full>
                  <textarea
                    value={shipping.giftNote}
                    onChange={(e) => setShipping({ giftNote: e.target.value })}
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "standard", label: "Standaard", detail: "2–4 werkdagen" },
                  { id: "express", label: "Express", detail: "1–2 werkdagen" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-3 font-sans text-sm transition-colors ${
                    shipping.shippingOption === opt.id
                      ? "border-accent-deep bg-accent/15"
                      : "border-ink/15 hover:border-stone"
                  }`}
                >
                  <span>
                    <input
                      type="radio"
                      name="shippingOption"
                      className="mr-2 accent-accent-deep"
                      checked={shipping.shippingOption === opt.id}
                      onChange={() => setShipping({ shippingOption: opt.id })}
                    />
                    {opt.label}
                    <span className="ml-1 text-stone">· {opt.detail}</span>
                  </span>
                  <span className="text-ink-soft">{formatPrice(SHIPPING_FEES[opt.id])}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-sans text-sm font-medium text-ink">Aantal exemplaren</legend>
            <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-ink/15 px-2 py-1.5">
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_COPIES", copies: copies - 1 })}
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-cream-dark"
                aria-label="Minder exemplaren"
              >
                −
              </button>
              <span className="w-6 text-center font-sans text-sm text-ink">{copies}</span>
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_COPIES", copies: copies + 1 })}
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-cream-dark"
                aria-label="Meer exemplaren"
              >
                +
              </button>
            </div>
          </fieldset>

          <button
            type="submit"
            className="rounded-full bg-accent px-8 py-3.5 font-sans text-sm font-medium text-ink transition-all hover:scale-[1.02] hover:bg-accent-deep"
          >
            Plaats bestelling
          </button>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <h3 className="font-serif text-lg italic text-ink">Besteloverzicht</h3>
            <div className="mt-4 space-y-2 font-sans text-sm text-ink-soft">
              <div className="flex justify-between">
                <span>
                  {BIRTHDAY_MAGAZINE.name} × {copies}
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Verzending ({shipping.shippingOption === "standard" ? "standaard" : "express"})</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-serif text-lg text-ink">
              <span>Totaal</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "mt-1 w-full rounded-sm border border-ink/15 bg-paper px-3 py-2 font-sans text-sm text-ink placeholder:text-stone-light focus:border-accent-deep focus:outline-none";

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="font-sans text-xs text-stone">
        {label}
        {required && <span className="text-accent-deep"> *</span>}
      </span>
      {children}
    </label>
  );
}
