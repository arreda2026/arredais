export function GuineaRibbon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-1.5 w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="h-full flex-1 bg-brand-green" />
      <div className="h-full flex-1 bg-white" />
      <div className="h-full flex-1 bg-brand-red" />
    </div>
  );
}
