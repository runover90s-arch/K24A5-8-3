import { el } from '../utils/dom.js';
import { eventConfig } from '../data/eventConfig.js';

type Star = { x: number; y: number; radius: number; phase: number; speed: number; alpha: number; depth: number; hue: number };

/** Canvas 2D theo hệ số DPR, tiết kiệm CPU/battery, không chặn touch scroll. */
export function createGalaxyBackground(): { root: HTMLElement; destroy: () => void } {
  const root = el('div', 'galaxy-backdrop');
  root.setAttribute('aria-hidden', 'true');
  root.append(el('div', 'nebula nebula-purple'), el('div', 'nebula nebula-blue'), el('div', 'nebula nebula-rose'));
  const canvas = el('canvas', 'star-canvas');
  root.append(canvas);
  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx || !eventConfig.enableParticles) return { root, destroy: () => undefined };

  let width = 0; let height = 0; let dpr = 1;
  let stars: Star[] = [];
  let frameId = 0; let lastFrame = 0; let lastShooting = 0;
  let shooting = { visible: false, born: 0, x: 0, y: 0 };
  let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let disposed = false; let pointerX = 0; let pointerY = 0;
  const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lowPower = window.matchMedia('(max-width: 600px)').matches || (navigator.hardwareConcurrency || 8) <= 4;
  const fps = lowPower ? 30 : 45;
  const frameInterval = 1000 / fps;

  function resize(): void {
    width = window.innerWidth; height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 1.8);
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const desired = Math.min(350, Math.max(105, Math.round((width * height) / (lowPower ? 3100 : 3000))));
    // Mỗi lần resize tái tạo ít sao với seed cố định để tránh bước nhảy lớn.
    let seed = 0x27D7B;
    const rand = () => ((seed = (Math.imul(1664525, seed) + 1013904223) >>> 0) / 4294967296);
    stars = Array.from({ length: desired }, (): Star => ({
      x: rand(), y: rand(),
      radius: .34 + rand() * (rand() > .94 ? 1.75 : .84),
      phase: rand() * Math.PI * 2, speed: .26 + rand() * 1.0,
      alpha: .25 + rand() * .62, depth: .25 + rand() * .75,
      hue: rand() > .82 ? 210 : rand() > .5 ? 267 : 43
    }));
    draw(performance.now());
  }
  function draw(now: number): void {
    ctx!.clearRect(0, 0, width, height);
    const t = now * .001;
    const parallaxX = reduced ? 0 : pointerX * 4;
    const parallaxY = reduced ? 0 : pointerY * 4;
    // Các chòm sao nền rất mảnh, không tranh sự chú ý với chữ.
    if (width > 350) {
      ctx!.strokeStyle = 'rgba(188,184,239,.075)'; ctx!.lineWidth = .7;
      const connect = [[3,8],[8,14],[14,19],[38,44],[44,49],[49,53],[65,70],[70,77],[77,80],[91,94],[94,99]];
      for (let k = 0; k < connect.length; k++) {
        const a = stars[connect[k][0] % stars.length], b = stars[connect[k][1] % stars.length];
        const dx = (a.x - b.x) * width, dy = (a.y - b.y) * height;
        if (dx * dx + dy * dy > 550 * 550) continue;
        ctx!.beginPath();
        ctx!.moveTo(a.x * width, a.y * height);
        ctx!.lineTo(b.x * width, b.y * height);
        ctx!.stroke();
      }
    }
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const twinkle = reduced ? 1 : .81 + Math.sin(t * s.speed + s.phase) * .19;
      const a = Math.min(1, s.alpha * twinkle);
      const x = s.x * width + parallaxX * s.depth;
      const y = s.y * height + parallaxY * s.depth;
      ctx!.beginPath();
      ctx!.fillStyle = `hsla(${s.hue}, 85%, 91%, ${a.toFixed(3)})`;
      ctx!.arc(x, y, s.radius, 0, Math.PI * 2);
      ctx!.fill();
      if (s.radius > 1.45) {
        ctx!.strokeStyle = `rgba(250,242,255,${a * .28})`;
        ctx!.lineWidth = .5;
        ctx!.beginPath();ctx!.moveTo(x-5,y);ctx!.lineTo(x+5,y);ctx!.moveTo(x,y-5);ctx!.lineTo(x,y+5);ctx!.stroke();
      }
    }
    if (!reduced && shooting.visible) {
      const age = now - shooting.born;
      if (age > 1000) shooting.visible = false;
      else {
        const p = age / 1000;
        const x = shooting.x - p * Math.min(width*.35,300), y = shooting.y + p * Math.min(height*.3,180);
        const gradient = ctx!.createLinearGradient(x+85,y-55,x,y);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(.75, `rgba(173,210,255,${(1-p)*.14})`);
        gradient.addColorStop(1, `rgba(250,247,255,${(1-p)*.8})`);
        ctx!.strokeStyle = gradient;ctx!.lineWidth = 1.5;
        ctx!.beginPath();ctx!.moveTo(x+85,y-55);ctx!.lineTo(x,y);ctx!.stroke();
      }
    }
    if (!reduced && now - lastShooting > 10500 && now > 4000) {
      lastShooting = now + Math.random() * 4500;
      shooting = { visible: true, born: now, x: width * (.58 + Math.random()*.4), y: height * (.06 + Math.random() * .31) };
    }
  }
  function tick(now: number): void {
    frameId = 0;
    if (disposed || document.hidden || reduced) return;
    if (now - lastFrame >= frameInterval) { lastFrame = now; draw(now); }
    frameId = requestAnimationFrame(tick);
  }
  function updateLoop(): void {
    cancelAnimationFrame(frameId); frameId = 0;
    if (!disposed && !document.hidden) {
      draw(performance.now());
      if (!reduced) frameId = requestAnimationFrame(tick);
    }
  }
  const onVisibility = () => updateLoop();
  const onResize = () => { resize(); updateLoop(); };
  const onMotion = () => { reduced = motionMedia.matches; updateLoop(); };
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    pointerX = (e.clientX / Math.max(1,width) - .5) * 2;
    pointerY = (e.clientY / Math.max(1,height) - .5) * 2;
  };
  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  motionMedia.addEventListener('change', onMotion);
  window.addEventListener('pointermove', onPointer, { passive: true });
  resize(); updateLoop();
  return {
    root,
    destroy() {
      disposed = true;cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      motionMedia.removeEventListener('change', onMotion);
      window.removeEventListener('pointermove', onPointer);
    }
  };
}
