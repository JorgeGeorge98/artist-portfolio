export function Arrow({ className = "", diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`h-5 w-5 ${className}`}>
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"} stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
