import { el } from '../utils/dom.js';
import type { StarTheme } from '../utils/visualSeed.js';

export interface StarFieldView { root: HTMLDivElement; show: (theme: StarTheme) => void; hide: () => void; launchParticle: (origin: HTMLElement, reduced: boolean) => void; }

/** Các đường chòm sao hiển thị theo seed STT, vẽ bằng SVG để đường có thể được 'viết ra'. */
export function createStarField(): StarFieldView {
  const root = el('div', 'constellation-layer');
  root.setAttribute('aria-hidden', 'true');
  let current: SVGSVGElement | null = null;
  let appearanceFrame = 0;
  function show(theme: StarTheme): void {
    cancelAnimationFrame(appearanceFrame);
    root.classList.remove('is-visible');
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--secondary', theme.secondary);
    current?.remove();
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.classList.add('constellation-svg');
    const connections = [...theme.points, theme.points[0]];
    const polyline = document.createElementNS(ns, 'polyline');
    polyline.setAttribute('points', connections.map(([x,y]) => `${x * 100},${y * 100}`).join(' '));
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', 'var(--accent)');
    polyline.setAttribute('stroke-width', '.17');
    polyline.setAttribute('stroke-linejoin', 'round');
    polyline.setAttribute('vector-effect', 'non-scaling-stroke');
    polyline.classList.add('constellation-line');
    svg.append(polyline);
    theme.points.forEach(([x,y],i) => {
      const ring = document.createElementNS(ns, 'circle');
      ring.setAttribute('cx', `${x*100}`); ring.setAttribute('cy', `${y*100}`); ring.setAttribute('r', '1.0');
      ring.setAttribute('fill', 'var(--accent)'); ring.classList.add('constellation-dot');
      ring.style.animationDelay = `${i * 80}ms`;
      svg.append(ring);
    });
    current = svg; root.append(svg);
    appearanceFrame = requestAnimationFrame(() => root.classList.add('is-visible'));
  }
  function launchParticle(origin: HTMLElement, reduced: boolean): void {
    if (reduced) return;
    const particle = el('div', 'comet-particle');
    root.append(particle);
    const from = origin.getBoundingClientRect();
    const x = from.left + from.width / 2;
    const y = from.top + from.height / 2;
    const toX = window.innerWidth / 2;
    const toY = window.innerHeight * .40;
    particle.style.left = `${x}px`; particle.style.top = `${y}px`;
    particle.animate([
      { transform: 'translate(-50%, -50%) scale(.2)', opacity: 0, offset: 0 },
      { transform: `translate(${(toX-x)*.46}px,${(toY-y)*.6-45}px) scale(1.3)`, opacity: 1, offset: .43 },
      { transform: `translate(${toX-x}px,${toY-y}px) scale(.1)`, opacity: 0, offset: 1 }
    ], { duration: 970, easing: 'cubic-bezier(.25,.5,.25,1)', fill: 'forwards' }).finished.catch(() => undefined).finally(() => particle.remove());
  }
  return { root, show, hide: () => { cancelAnimationFrame(appearanceFrame); root.classList.remove('is-visible'); }, launchParticle };
}
