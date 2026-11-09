export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function observeReducedMotion(onChange: (value: boolean) => void): () => void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handle = () => onChange(media.matches);
  media.addEventListener('change', handle);
  handle();
  return () => media.removeEventListener('change', handle);
}
