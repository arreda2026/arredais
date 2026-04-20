export function CornerMark({
  position,
  className = "",
}: {
  position: "tl" | "br";
  className?: string;
}) {
  const base = "pointer-events-none absolute text-brand-red";
  if (position === "tl") {
    return (
      <svg
        className={`${base} left-3 top-3 h-6 w-6 ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 20V4h16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
      </svg>
    );
  }
  return (
    <svg
      className={`${base} bottom-3 right-3 h-6 w-6 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 4v16H4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
