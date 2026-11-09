import { el } from '../utils/dom.js';

export function createIntroScene(onStart: () => void): HTMLElement {
  const section = el('section', 'scene scene--intro scene--active');
  section.id = 'scene-intro';
  section.setAttribute('aria-labelledby', 'intro-title');
  const main = el('div', 'scene-inner intro-inner');
  const kicker = el('p', 'eyebrow', 'MỘT MÓN QUÀ ĐƯỢC GỬI TỪ VŨ TRỤ');
  const title = el('h1', 'intro-title', 'Một vũ trụ nhỏ,');
  title.id = 'intro-title';
  const titleEm = el('span', 'headline-italics', 'dành riêng cho bạn.');
  title.append(el('br'), titleEm);
  const subtitle = el('p', 'intro-lead', 'Giữa hàng tỷ vì sao, có một ngôi sao mang tên bạn. Và một lá thư đang đợi được mở.');
  const day = el('div', 'date-divider');
  day.append(el('span', 'divider-line'), el('span', 'date-text', '08 · 03 · 2027'), el('span', 'divider-line'));
  const start = el('button', 'primary-btn start-btn', 'Khám phá vũ trụ của mình');
  start.type = 'button';
  start.append(el('span', 'btn-sparkle', '✦'));
  start.addEventListener('click', onStart);
  const skip = el('button', 'text-btn subtle skip-intro', 'Bỏ qua lời mở đầu');
  skip.type = 'button';
  skip.addEventListener('click', onStart);
  main.append(kicker, title, subtitle, day, start, skip);
  section.append(main);
  return section;
}
