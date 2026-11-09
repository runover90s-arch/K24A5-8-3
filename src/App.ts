import { eventConfig } from './data/eventConfig.js';
import { recipients, recipientByStt, type Recipient } from './data/recipients.js';
import { letters } from './data/letters.js';
import { makeVisualSeed } from './utils/visualSeed.js';
import { el, wait } from './utils/dom.js';
import { observeReducedMotion } from './hooks/useReducedMotion.js';
import { createGalaxyBackground } from './components/GalaxyBackground.js';
import { createIntroScene } from './components/IntroScene.js';
import { createStudentLookup } from './components/StudentLookup.js';
import { createMorphTransition } from './components/MorphTransition.js';
import { createLetterView } from './components/LetterView.js';
import { createClosingScene } from './components/ClosingScene.js';
import { createStarField } from './components/StarField.js';
import { createAudioToggle } from './components/AudioToggle.js';

type AppStage = 'intro' | 'lookup' | 'recognize' | 'letter' | 'closing';

/**
 * Điều phối các cảnh theo một state machine tối giản và huỷ được.
 * Phần tử morph tồn tại xuyên suốt, KHÔNG bị tạo lại khi đổi scene.
 */
export function mountApp(host: HTMLElement): () => void {
  const shell = el('div', 'app-shell');
  shell.dataset.scene = 'intro';
  const galaxy = createGalaxyBackground();
  const starField = createStarField();
  const morph = createMorphTransition();
  const foreground = el('div', 'story-foreground');
  const header = el('header', 'site-header');
  const brand = el('div', 'site-brand');
  brand.append(el('span', 'brand-mark', '✦'), el('span', 'brand-name', 'GALAXY LETTERS'));
  const meta = el('div', 'header-meta', 'MỘT MÓN QUÀ ĐẶC BIỆT · 08.03.2027');
  header.append(brand, meta);
  if (eventConfig.enableAudio) header.append(createAudioToggle());
  const story = el('main', 'story-root');
  story.id = 'main-content';
  const toast = el('div', 'toast-message');
  toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  const footer = el('footer', 'site-footer');
  footer.append(el('span', '', 'Được viết bằng tất cả sự trân trọng'), el('span', 'footer-sigil', '✧'), el('span', '', '08 . 03 . 2027'));
  const skipMotion = el('button', 'skip-motion', 'Bỏ qua hiệu ứng');
  skipMotion.type = 'button';
  skipMotion.hidden = true;
  const recognizing = el('section', 'scene scene--recognize');
  recognizing.id = 'scene-recognize';
  const recognizeInner = el('div', 'scene-inner recognize-inner');
  const recognizeTag = el('p', 'eyebrow', 'BƯỚC 02 · NGÔI SAO ĐÃ ĐÁP LỜI');
  const recognizeName = el('h2', 'recognize-title');
  const recognizeSub = el('p', 'recognize-sub', 'Một lời chúc từ những người bạn của bạn.');
  recognizeInner.append(recognizeTag, recognizeName, recognizeSub);
  recognizing.append(recognizeInner);

  let stage: AppStage = 'intro';
  let recipient: Recipient | null = null;
  let motionController: AbortController | null = null;
  let motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let showToastTimer = 0;
  let sceneUpdateTimer = 0;

  const intro = createIntroScene(() => enterLookup());
  const lookup = createStudentLookup((stt) => { void beginReveal(stt); });
  const closing = createClosingScene(() => enterLookup());
  const letterView = createLetterView({
    onBack: () => enterLookup(),
    onReplay: () => {
      letterView.root.scrollTo({ top: 0, behavior: motionReduced ? 'instant' : 'smooth' });
      const paper = morph.sheet;
      if (!motionReduced) void paper.animate([
        { filter: 'brightness(1.03)' }, { filter: 'brightness(1)' }
      ], { duration: 680, easing: 'ease-out' }).finished.catch(() => undefined);
      letterView.focus();
    },
    onShare: () => { void shareGift(); },
    onWish: () => showClosing()
  });
  morph.sheet.append(letterView.root);
  story.append(intro, lookup.root, recognizing, closing.root);
  foreground.append(header, story, footer, skipMotion, toast);
  shell.append(galaxy.root, starField.root, morph.root, foreground);
  host.replaceChildren(shell);
  const allScenes = [intro, lookup.root, recognizing, closing.root];
  function setActiveScene(target: HTMLElement | null): void {
    for (const scene of allScenes) {
      const active = scene === target;
      scene.classList.toggle('scene--active', active);
      scene.setAttribute('aria-hidden', active ? 'false' : 'true');
      scene.inert = !active;
    }
  }
  function setStage(value: AppStage): void {
    stage = value;
    shell.dataset.scene = value;
    morph.stage(value);
    skipMotion.hidden = value !== 'recognize' || motionReduced;
    if (value === 'intro') setActiveScene(intro);
    if (value === 'lookup') setActiveScene(lookup.root);
    if (value === 'recognize') setActiveScene(recognizing);
    if (value === 'letter') setActiveScene(null);
    if (value === 'closing') setActiveScene(closing.root);
  }
  function stopMotion(): void {
    motionController?.abort(); motionController = null;
    window.clearTimeout(sceneUpdateTimer);
  }
  function enterLookup(): void {
    stopMotion();
    morph.setOpened(false);
    starField.hide();
    lookup.reset();
    recipient = null;
    setStage('lookup');
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }
  function finishLetter(): void {
    if (!recipient) return;
    stopMotion();
    morph.setOpened(true);
    setStage('letter');
    starField.hide();
    // Đợi hình học giấy hoàn tất rồi đưa focus đến tiêu đề cho screen reader.
    sceneUpdateTimer = window.setTimeout(() => letterView.focus(), motionReduced ? 30 : 750);
  }
  async function beginReveal(stt: number): Promise<void> {
    if (stage !== 'lookup') return;
    const match = recipientByStt.get(stt);
    if (!match) return;
    const letter = letters[match.letterId];
    if (!letter) return;
    recipient = match;
    const theme = makeVisualSeed(stt);
    morph.setRecipient(match.displayName, match.theme ? {
      ...theme, accent: match.theme.accent, secondary: match.theme.secondary
    } : theme);
    letterView.render(match, letter);
    recognizing.setAttribute('aria-labelledby', 'recognize-name');
    recognizeName.id = 'recognize-name';
    recognizeName.textContent = `Dành riêng cho ${match.displayName}`;
    closing.setName(match.displayName);
    starField.show(theme);
    setStage('recognize');
    if (motionReduced) { finishLetter(); return; }
    starField.launchParticle(lookup.form, false);
    const controller = new AbortController();
    motionController = controller;
    const { signal } = controller;
    await wait(850, signal); if (signal.aborted) return;
    shell.classList.add('star-recognized');
    await wait(430, signal); if (signal.aborted) return;
    morph.stage('envelope');
    await wait(650, signal); if (signal.aborted) return;
    morph.setOpened(true);
    await wait(880, signal); if (signal.aborted) return;
    shell.classList.remove('star-recognized');
    finishLetter();
  }
  skipMotion.addEventListener('click', finishLetter);
  function showClosing(): void {
    if (!recipient) return;
    stopMotion();
    setStage('closing');
    closing.root.querySelector<HTMLElement>('#closing-title')?.focus({ preventScroll: true });
  }
  function notify(message: string): void {
    toast.textContent = message;
    toast.classList.add('toast--visible');
    window.clearTimeout(showToastTimer);
    showToastTimer = window.setTimeout(() => toast.classList.remove('toast--visible'), 4000);
  }
  async function shareGift(): Promise<void> {
    const url = new URL(window.location.pathname, window.location.origin).href;
    const data = { title: 'GALAXY LETTERS — 08.03.2027', text: 'Một vũ trụ nhỏ, dành riêng cho bạn ✨', url };
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(url); notify('Đã sao chép đường dẫn món quà.'); return; }
      catch { /* Fallback cho trình duyệt không cho quyền clipboard. */ }
    }
    const temporary = el('textarea');
    temporary.value = url;
    temporary.setAttribute('aria-label', 'Đường dẫn để chia sẻ');
    temporary.style.position = 'fixed'; temporary.style.left = '-9999px';
    document.body.append(temporary);temporary.select();
    const copied = document.execCommand('copy');
    temporary.remove();
    notify(copied ? 'Đã sao chép đường dẫn món quà.' : `Hãy sao chép đường dẫn trên thanh địa chỉ để chia sẻ nhé.`);
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && stage === 'recognize') finishLetter();
  };
  window.addEventListener('keydown', onKeydown);
  const unobserveMotion = observeReducedMotion((value) => {
    motionReduced = value;
    shell.classList.toggle('reduced-motion', value);
    skipMotion.hidden = value || stage !== 'recognize';
    if (value && stage === 'recognize') finishLetter();
  });
  setActiveScene(intro); // Ẩn semantic các scene khác ngay ở lần đầu, tránh screen reader đọc nhầm.
  if (!eventConfig.enableIntro) enterLookup();
  if (eventConfig.showCountdown) {
    const countdown = el('div', 'countdown');
    footer.prepend(countdown);
    const moment = new Date('2027-03-07T17:00:00Z').getTime(); // 00:00 ngày 08/03 giờ Việt Nam
    const update = () => {
      const days = Math.ceil((moment - Date.now()) / 86400000);
      countdown.textContent = days > 0 ? `Còn ${days} ngày đến 08.03.2027` : '';
    };
    update();const timer = window.setInterval(update, 60000);
    window.addEventListener('pagehide', () => window.clearInterval(timer), { once: true });
  }
  // Một kiểm tra nhẹ ở runtime, hữu ích khi chủ repo chỉnh sửa dữ liệu.
  if (recipients.length !== 24) console.warn('Số người nhận hiện khác 24, hãy kiểm tra dữ liệu trước khi phát hành.');
  return () => {
    stopMotion();unobserveMotion();galaxy.destroy();
    window.removeEventListener('keydown', onKeydown);
    window.clearTimeout(showToastTimer);
    shell.remove();
  };
}
