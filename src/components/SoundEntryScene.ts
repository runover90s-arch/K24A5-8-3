import { el } from '../utils/dom.js';

/** Màn chạm mở khóa autoplay hợp lệ trên Android/iOS. */
export function createSoundEntryScene(
  tryPlay: () => Promise<boolean>,
  onBegin: () => void,
  onBeginWithoutAudio: () => void
): HTMLElement {
  const section = el('section', 'scene scene--entry');
  section.id = 'scene-entry';
  section.setAttribute('aria-labelledby', 'entry-title');

  const glow = el('div', 'entry-orbit-light');
  glow.setAttribute('aria-hidden', 'true');
  const inner = el('div', 'entry-inner');
  const eyebrow = el('p', 'entry-eyebrow', 'GALAXY LETTERS · 08.03.2027');
  const sigil = el('span', 'entry-sigil', '✧');
  sigil.setAttribute('aria-hidden', 'true');
  const title = el('h1', 'entry-title', 'Trước khi vũ trụ thức giấc...');
  title.id = 'entry-title';
  const note = el('p', 'entry-copy', 'Có một câu chuyện đang chờ bạn.\n\nHãy đeo tai nghe nếu có, chạm vào nút bên dưới và để âm nhạc dẫn lối.');
  const begin = el('button', 'primary-btn entry-begin', 'Bước vào vũ trụ');
  begin.type = 'button';
  begin.id = 'entry-begin';
  begin.prepend(el('span', 'entry-headphones', '♫'));
  const hint = el('p', 'entry-hint', 'Âm nhạc sẽ bắt đầu khi bạn chạm nút.');
  const status = el('p', 'entry-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const fallback = el('button', 'text-btn entry-fallback', 'Tiếp tục không có nhạc');
  fallback.type = 'button';
  fallback.hidden = true;
  inner.append(eyebrow, sigil, title, note, begin, hint, status, fallback);
  section.append(glow, inner);

  let pending = false;
  let complete = false;
  function start(): void {
    if (pending || complete) return;
    pending = true;
    begin.disabled = true;
    begin.setAttribute('aria-busy', 'true');
    status.textContent = 'Đang khởi động âm nhạc...';
    fallback.hidden = true;

    // Lệnh play() thực thi ngay trong callback click, trước lần await đầu tiên.
    let result: Promise<boolean>;
    try {
      result = tryPlay();
    } catch {
      result = Promise.resolve(false);
    }
    void Promise.resolve(result).then((played) => {
      if (complete) return;
      pending = false;
      begin.disabled = false;
      begin.removeAttribute('aria-busy');
      if (played) {
        complete = true;
        status.textContent = '';
        onBegin();
      } else {
        status.textContent = 'Trình duyệt chưa phát được nhạc. Bạn có thể thử chạm lại.';
        begin.textContent = '♫  Thử bật nhạc lần nữa';
        hint.textContent = 'Nếu không phát được, bạn vẫn có thể đọc thư mà không bị kẹt.';
        fallback.hidden = false;
      }
    }, () => {
      pending = false;
      begin.disabled = false;
      begin.removeAttribute('aria-busy');
      status.textContent = 'Không thể khởi động nhạc. Hãy thử lại hoặc tiếp tục không có nhạc.';
      fallback.hidden = false;
    });
  }
  begin.addEventListener('click', start);
  fallback.addEventListener('click', () => {
    if (complete || pending) return;
    complete = true;
    onBeginWithoutAudio();
  });
  return section;
}
