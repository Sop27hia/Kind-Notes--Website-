"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { PhotoSlot } from "@/lib/magazine-templates";
import type { PhotoValue } from "@/lib/wizard-types";
import { CameraIcon } from "@/components/icons/StepIcons";

const ASPECT_CLASS: Record<PhotoSlot["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PhotoDropzone({
  slot,
  value,
  onChange,
  onClear,
}: {
  slot: PhotoSlot;
  value: PhotoValue | undefined;
  onChange: (photo: PhotoValue) => void;
  onClear: () => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panStart = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(
    null
  );

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const src = await readFileAsDataUrl(file);
    onChange({ src, x: 0, y: 0, scale: 1 });
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!value) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    panStart.current = { pointerX: e.clientX, pointerY: e.clientY, x: value.x, y: value.y };
    setIsPanning(true);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isPanning || !value || !panStart.current) return;
    const dx = e.clientX - panStart.current.pointerX;
    const dy = e.clientY - panStart.current.pointerY;
    const nextX = clamp(panStart.current.x + dx / 2, -50, 50);
    const nextY = clamp(panStart.current.y + dy / 2, -50, 50);
    onChange({ ...value, x: nextX, y: nextY });
  }

  function handlePointerUp() {
    setIsPanning(false);
    panStart.current = null;
  }

  return (
    <div className="w-full">
      <div
        className={`relative ${ASPECT_CLASS[slot.aspect]} film-grain w-full overflow-hidden rounded-sm border ${
          isDragOver ? "border-accent-deep" : "border-ink/15"
        } bg-cream-dark/60`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        {value ? (
          <div
            className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.src}
              alt={slot.label}
              draggable={false}
              className="h-full w-full select-none object-cover grayscale contrast-110"
              style={{
                objectPosition: `${50 + value.x}% ${50 + value.y}%`,
                transform: `scale(${value.scale})`,
              }}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-stone transition-colors hover:text-ink-soft"
          >
            <CameraIcon className="h-6 w-6" />
            <span className="px-2 text-center font-sans text-xs">
              Sleep een foto hierheen
              <br />
              of klik om te uploaden
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="font-sans text-xs text-stone">{slot.label}</span>
        {value ? (
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={2.2}
              step={0.05}
              value={value.scale}
              onChange={(e) => onChange({ ...value, scale: Number(e.target.value) })}
              className="w-20 accent-accent-deep"
              aria-label="Zoom"
            />
            <button
              type="button"
              onClick={() => {
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="font-sans text-xs text-stone underline decoration-stone-light underline-offset-2 hover:text-ink"
            >
              verwijder
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-sans text-xs text-accent-deep underline decoration-accent/60 underline-offset-2"
          >
            uploaden
          </button>
        )}
      </div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
