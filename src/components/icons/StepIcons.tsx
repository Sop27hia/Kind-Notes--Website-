type IconProps = { className?: string };

export function ChooseIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="6" width="26" height="34" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 14h14M14 20h14M14 26h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="35" cy="35" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M32.4 35l1.8 1.8 3.4-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PersonalizeIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M12 30.5 28.8 13.7a2.5 2.5 0 0 1 3.5 0l2 2a2.5 2.5 0 0 1 0 3.5L17.5 36 10 38l2-7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M25.5 16.9l5.6 5.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ShipIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="7" y="16" width="21" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M28 21h6.5L41 27v5a1.5 1.5 0 0 1-1.5 1.5H28V21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="34.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="34.5" cy="34.5" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function HeartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 20.5s-7.5-4.6-10-9.4C.4 7.9 2 4.5 5.4 4a4.9 4.9 0 0 1 6.6 2.3A4.9 4.9 0 0 1 18.6 4c3.4.5 5 3.9 3.4 7.1-2.5 4.8-10 9.4-10 9.4Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CameraIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17V8.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="12.5" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
