export function RedAccentLine({ className = "" }: { className?: string }) {
  return (
    <span
      className={`mt-2 inline-block h-[3px] w-[60px] rounded-full bg-brand-red ${className}`}
      aria-hidden
    />
  );
}
