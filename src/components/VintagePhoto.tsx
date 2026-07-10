type VintagePhotoProps = {
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  rounded?: boolean;
  caption?: string;
  children?: React.ReactNode;
};

const GRADIENTS: Record<number, string> = {
  1: "radial-gradient(circle at 30% 20%, #6b6862 0%, #2a2825 55%, #100f0d 100%)",
  2: "radial-gradient(circle at 70% 30%, #55524c 0%, #201e1b 60%, #0b0a09 100%)",
  3: "linear-gradient(155deg, #4a4741 0%, #221f1c 45%, #0d0c0b 100%)",
  4: "radial-gradient(ellipse at 50% 15%, #706c63 0%, #302d29 50%, #131211 100%)",
  5: "linear-gradient(200deg, #605c54 0%, #2b2825 50%, #100f0e 100%)",
  6: "radial-gradient(circle at 20% 70%, #5c584f 0%, #262421 55%, #0e0d0c 100%)",
};

/**
 * Placeholder for a grainy black & white candid photo — used everywhere a
 * real customer/product photo would sit. Pure CSS/SVG so the site has no
 * external image dependency.
 */
export default function VintagePhoto({
  variant = 1,
  className = "",
  rounded = false,
  caption,
  children,
}: VintagePhotoProps) {
  return (
    <div
      className={`film-grain film-vignette relative overflow-hidden ${rounded ? "rounded-sm" : ""} ${className}`}
      style={{ background: GRADIENTS[variant] }}
    >
      {children}
      {caption && (
        <span className="absolute bottom-3 left-3 z-10 font-script text-lg text-cream/90">
          {caption}
        </span>
      )}
    </div>
  );
}
