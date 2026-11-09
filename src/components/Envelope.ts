import { el } from '../utils/dom.js';

export interface EnvelopeView { root: HTMLElement; setName: (name: string) => void; setOpen: (open: boolean) => void; }

/** Vỏ thư thật gồm mặt sau, giấy kéo ra, mặt trước, nắp có perspective rotateX. */
export function createEnvelope(): EnvelopeView {
  const root = el('div', 'envelope-shell');
  root.setAttribute('aria-hidden', 'true');
  const back = el('div', 'envelope-back');
  const paper = el('div', 'envelope-insert');
  paper.append(el('div', 'envelope-insert-star', '✦'));
  const recipient = el('div', 'envelope-insert-name', 'Dành riêng cho bạn');
  paper.append(recipient, el('div', 'envelope-insert-date', '08 . 03 . 2027'));
  const front = el('div', 'envelope-front');
  const flap = el('div', 'envelope-flap');
  const wax = el('div', 'envelope-seal', '✧');
  root.append(back, paper, front, flap, wax);
  return {
    root,
    setName: (name) => { recipient.textContent = `Gửi ${name}`; },
    setOpen: (open) => root.classList.toggle('opened', open)
  };
}
