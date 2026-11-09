import { el } from '../utils/dom.js';

export type IntroSceneElement = HTMLElement & {
  beginIntro: (reducedMotion: boolean) => void;
  destroyIntro: () => void;
};

const STORY_BEATS = [
  'Giữa hàng tỷ vì sao trên bầu trời, vẫn có một vì sao mang tên bạn.',
  'Và hôm nay, có một lá thư được viết riêng cho vì sao ấy.',
  'Mỗi người đều có một vị trí riêng trên bầu trời.',
  'Hãy bước vào một vũ trụ huyền ảo.',
  'Đó là cảm giác được trân trọng khi tên mình hiện lên giữa bầu trời.',
  'Đó là cảm giác xúc động nhẹ nhàng khi đọc một lá thư được viết riêng.',
  'Mỗi bạn nữ là một ngôi sao riêng biệt.',
  'Mong rằng bạn sẽ luôn tìm thấy ánh sáng của riêng mình.',
  'Có ai đó đã dành thời gian chuẩn bị một điều đặc biệt cho mình.'
];

/** Thời gian chỉ bắt đầu đếm SAU một thao tác chạm khởi chạy nhạc. */
export function createIntroScene(onStart: () => void): IntroSceneElement {
  const section = el('section', 'scene scene--intro') as IntroSceneElement;
  section.id = 'scene-intro';
  section.dataset.phase = 'black';
  section.setAttribute('aria-labelledby', 'intro-title');

  const visual = el('div', 'intro-galaxy-visual');
  visual.setAttribute('aria-hidden', 'true');
  const galaxy = el('img', 'intro-galaxy-image') as HTMLImageElement;
  galaxy.src = './images/spiral-galaxy.webp';
  galaxy.alt = '';
  galaxy.decoding = 'async';
  galaxy.draggable = false;
  visual.append(galaxy, el('div', 'intro-galaxy-veil'), el('div', 'intro-cosmic-dust'));

  const main = el('div', 'scene-inner intro-inner');
  const copy = el('p', 'intro-copy');
  copy.setAttribute('role', 'status');
  copy.setAttribute('aria-live', 'polite');
  copy.setAttribute('aria-atomic', 'true');

  const final = el('div', 'intro-final');
  final.hidden = true;
  const kicker = el('p', 'intro-kicker', 'GALAXY LETTERS');
  const title = el('h1', 'intro-title', 'Một vũ trụ nhỏ,');
  title.id = 'intro-title';
  const titleEm = el('span', 'headline-italics', 'dành riêng cho bạn.');
  title.append(el('br'), titleEm);
  const subtitle = el('p', 'intro-lead', 'Giữa hàng tỷ vì sao, có một ngôi sao mang tên bạn. Và một lá thư đang đợi được mở.');
  const date = el('div', 'intro-date', '08 · 03 · 2027');
  const start = el('button', 'primary-btn start-btn', 'Bước vào vũ trụ');
  start.type = 'button';
  start.append(el('span', 'btn-sparkle', '✦'));
  final.append(kicker, title, subtitle, date, start);

  const skip = el('button', 'text-btn subtle skip-intro', 'Bỏ qua phần mở đầu');
  skip.type = 'button';
  main.append(copy, final);
  section.append(visual, main, skip);

  let running = false;
  let ended = false;
  const timers: number[] = [];
  const schedule = (at: number, action: () => void): void => {
    timers.push(window.setTimeout(() => { if (!ended) action(); }, at));
  };

  function showBeat(text: string, index: number): void {
    section.dataset.phase = 'story';
    section.dataset.beat = String(index + 1);
    copy.classList.remove('intro-copy--visible');
    timers.push(window.setTimeout(() => {
      if (ended || section.dataset.phase !== 'story') return;
      copy.textContent = text;
      copy.classList.add('intro-copy--visible');
    }, 260));
  }

  function showFinal(): void {
    section.dataset.reveal = 'true';
    section.dataset.phase = 'final';
    copy.classList.remove('intro-copy--visible');
    final.hidden = false;
    timers.push(window.setTimeout(() => {
      if (!ended) final.classList.add('intro-final--visible');
    }, 120));
  }

  function startExperience(): void {
    if (ended || !running) return;
    ended = true;
    timers.forEach(window.clearTimeout);
    timers.length = 0;
    onStart();
  }

  section.beginIntro = (reducedMotion: boolean) => {
    if (running || ended) return;
    running = true;
    if (reducedMotion) {
      showFinal();
      return;
    }
    // 5s đen hoàn toàn, 9 nhịp chữ (~5,7s/nhịp), thiên hà từ 40,5s.
    STORY_BEATS.forEach((text, index) => schedule(5000 + index * 5700, () => showBeat(text, index)));
    schedule(40500, () => { section.dataset.reveal = 'true'; });
    schedule(56500, showFinal);
  };
  skip.addEventListener('click', startExperience);
  start.addEventListener('click', startExperience);
  section.destroyIntro = () => {
    ended = true;
    timers.forEach(window.clearTimeout);
    timers.length = 0;
  };
  return section;
}
