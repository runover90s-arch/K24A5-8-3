import { el } from '../utils/dom.js';
import type { Recipient } from '../data/recipients.js';
import type { PersonalLetter } from '../data/letters.js';
import { eventConfig } from '../data/eventConfig.js';

export interface LetterActions { onBack: () => void; onReplay: () => void; onShare: () => void; onWish: () => void; }
export interface LetterView { root: HTMLElement; render: (recipient: Recipient, letter: PersonalLetter) => void; focus: () => void; }

export function createLetterView(actions: LetterActions): LetterView {
  const root = el('div', 'letter-scroll');
  const ornament = el('div', 'paper-ornament', '✧  ·  ✦  ·  ✧');
  const stamp = el('div', 'letter-date', 'MỘT LÁ THƯ TỪ VŨ TRỤ · 08.03.2027');
  const heading = el('h2', 'letter-title'); heading.id = 'letter-heading';
  heading.tabIndex = -1;
  const under = el('p', 'letter-to');
  const divider = el('div', 'paper-divider'); divider.setAttribute('aria-hidden', 'true');
  const body = el('div', 'letter-body');
  const ending = el('p', 'letter-ending');
  const signature = el('p', 'letter-signature', `Từ ${eventConfig.sender.toLocaleLowerCase('vi')},`);
  const signDetail = el('p', 'signature-detail', 'với tất cả sự trân trọng.');
  const actionsRow = el('div', 'letter-actions');
  const reread = el('button', 'soft-btn', '↺  Đọc lại thư'); reread.type = 'button';
  const back = el('button', 'soft-btn', '✧  Quay về bầu trời'); back.type = 'button';
  const share = el('button', 'soft-btn', '↗  Chia sẻ món quà này'); share.type = 'button';
  reread.addEventListener('click', actions.onReplay);
  back.addEventListener('click', actions.onBack);
  share.addEventListener('click', actions.onShare);
  actionsRow.append(reread, back, share);
  const wishArea = el('div', 'wish-area');
  const wishCopy = el('p', 'wish-instruction', 'Còn một lời chúc nữa, đang đợi ở cuối bầu trời…');
  const wish = el('button', 'wish-star', '✦'); wish.type = 'button';
  wish.setAttribute('aria-label', 'Chạm vào ngôi sao để xem lời chúc cuối');
  wish.addEventListener('click', actions.onWish);
  const wishLabel = el('span', 'wish-label', 'Chạm vào ngôi sao');
  wishArea.append(wishCopy, wish, wishLabel);
  root.append(ornament, stamp, heading, under, divider, body, ending, signature, signDetail, actionsRow, wishArea);
  return {
    root,
    render(recipient, letter) {
      heading.textContent = `Gửi ${recipient.displayName},`;
      under.textContent = `Lá thư dành riêng cho ${recipient.displayName}`;
      body.replaceChildren(...letter.paragraphs.map((content) => el('p', '', content)));
      ending.textContent = letter.ending;
      signature.textContent = `Từ ${eventConfig.sender.toLocaleLowerCase('vi')},`;
      root.scrollTop = 0;
    },
    focus: () => heading.focus({ preventScroll: true })
  };
}
