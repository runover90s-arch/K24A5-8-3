import { el } from '../utils/dom.js';
import { createEnvelope } from './Envelope.js';
import type { StarTheme } from '../utils/visualSeed.js';

export type MorphStage = 'intro' | 'lookup' | 'recognize' | 'envelope' | 'letter' | 'closing';
export interface MorphView {
  root: HTMLElement;
  sheet: HTMLElement;
  stage: (stage: MorphStage) => void;
  setRecipient: (name: string, theme: StarTheme) => void;
  setOpened: (open: boolean) => void;
}

/**
 * MỘT DOM NODE DUY NHẤT tồn tại xuyên suốt sáu cảnh. Kích thước, vị trí,
 * hình học và trạng thái của nó được chuyển tiếp bằng CSS, không remount.
 * Ngôi sao → hào quang → phong thư → mặt giấy → khung thư → ngôi sao.
 */
export function createMorphTransition(): MorphView {
  const root = el('div', 'morph-object');
  root.id = 'morph-object';
  root.dataset.stage = 'intro';
  root.setAttribute('aria-label', 'Ngôi sao dẫn đường');
  const halo = el('div', 'morph-halo');
  const orbitA = el('div', 'morph-orbit morph-orbit-a');
  const orbitB = el('div', 'morph-orbit morph-orbit-b');
  const core = el('div', 'morph-core');
  const ray = el('div', 'morph-ray');
  const envelope = createEnvelope();
  const sheet = el('article', 'letter-sheet');
  sheet.id = 'letter-sheet';
  sheet.setAttribute('aria-labelledby', 'letter-heading');
  sheet.setAttribute('aria-hidden', 'true');
  sheet.inert = true;
  root.append(halo, orbitA, orbitB, core, ray, envelope.root, sheet);
  return {
    root, sheet,
    stage: (stage) => {
      root.dataset.stage = stage;
      const opened = stage === 'letter';
      sheet.setAttribute('aria-hidden', opened ? 'false' : 'true');
      sheet.inert = !opened;
    },
    setRecipient: (name, theme) => {
      envelope.setName(name);
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--secondary', theme.secondary);
      root.style.setProperty('--orbit-angle', `${theme.orbitAngle}deg`);
    },
    setOpened: envelope.setOpen
  };
}
