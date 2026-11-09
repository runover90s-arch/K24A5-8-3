import { el } from '../utils/dom.js';

export interface ClosingScene { root: HTMLElement; setName: (name: string) => void; }

export function createClosingScene(onBack: () => void): ClosingScene {
  const root = el('section', 'scene scene--closing');
  root.id = 'scene-closing';
  root.setAttribute('aria-labelledby', 'closing-title');
  const inner = el('div', 'scene-inner closing-inner');
  const tag = el('p', 'eyebrow', 'MỘT LỜI CHÚC CUỐI CÙNG');
  const name = el('p', 'closing-for', 'Dành riêng cho bạn');
  const heading = el('h2', 'closing-title', 'Mong rằng bạn sẽ luôn');
  heading.id = 'closing-title'; heading.tabIndex = -1;
  heading.append(el('br'), el('span', 'headline-italics', 'tìm thấy ánh sáng của riêng mình.'));
  const note = el('p', 'closing-note', 'Dù hành trình đưa bạn đến đâu, mong mọi điều tử tế vẫn luôn tìm được đường đến bên bạn.');
  const signature = el('p', 'closing-date', 'Happy Women’s Day — 08.03.2027');
  const back = el('button', 'outline-btn closing-back', '←  Trở về bầu trời');
  back.type = 'button'; back.addEventListener('click', onBack);
  inner.append(tag, name, heading, note, signature, back);
  root.append(inner);
  return { root, setName: (value) => { name.textContent = `Một vì sao dành cho ${value}`; } };
}
