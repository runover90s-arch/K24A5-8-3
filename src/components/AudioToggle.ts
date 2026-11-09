import { el } from '../utils/dom.js';

export interface AudioController {
  button: HTMLButtonElement;
  /** Gọi trực tiếp từ sự kiện click/touch; KHÔNG await trước .play(). */
  playFromGesture: () => Promise<boolean>;
  stop: () => void;
  destroy: () => void;
}

const VOLUME = 0.34;

/** Một audio element dùng xuyên suốt intro, tìm sao và đọc thư. */
export function createAudioToggle(): AudioController {
  const button = el('button', 'audio-toggle', '♪  Bật nhạc');
  button.type = 'button';
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-label', 'Bật nhạc nền');
  button.title = 'Chạm để bật hoặc tắt nhạc nền';

  const audio = document.createElement('audio') as HTMLAudioElement;
  audio.src = './audio/galaxy-letters-original-score.mp3';
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = 0;
  audio.setAttribute('aria-hidden', 'true');

  let enabled = false;
  let disposed = false;
  let operation = 0;
  let fadeTimer = 0;
  let pauseTimer = 0;

  function updateButton(): void {
    button.textContent = enabled ? '♪  Tắt nhạc' : '♪  Bật nhạc';
    button.setAttribute('aria-label', enabled ? 'Tắt nhạc nền' : 'Bật nhạc nền');
    button.setAttribute('aria-pressed', String(enabled));
    button.title = enabled ? 'Tắt nhạc nền' : 'Bật nhạc nền';
  }

  function fadeVolume(target: number): void {
    window.clearInterval(fadeTimer);
    const from = audio.volume;
    let frame = 0;
    const total = 24;
    fadeTimer = window.setInterval(() => {
      frame += 1;
      const t = Math.min(frame / total, 1);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (frame >= total) window.clearInterval(fadeTimer);
    }, 45);
  }

  function playFromGesture(): Promise<boolean> {
    if (disposed) return Promise.resolve(false);
    if (enabled && !audio.paused) return Promise.resolve(true);
    const currentOperation = ++operation;
    window.clearTimeout(pauseTimer);
    window.clearInterval(fadeTimer);
    audio.volume = 0.015;

    // Phải gọi audio.play() trong chính callstack của thao tác chạm thực tế.
    // Không được chờ một Promise (fetch, animation hay timer) trước lệnh này.
    let playResult: Promise<void> | undefined;
    try {
      playResult = audio.play();
    } catch {
      if (currentOperation === operation) { enabled = false; updateButton(); }
      return Promise.resolve(false);
    }
    return Promise.resolve(playResult).then(() => {
      if (disposed || currentOperation !== operation) {
        audio.pause();
        return false;
      }
      enabled = true;
      updateButton();
      fadeVolume(VOLUME);
      return true;
    }, () => {
      if (currentOperation === operation) {
        enabled = false;
        updateButton();
      }
      return false;
    });
  }

  function stop(): void {
    ++operation;
    window.clearTimeout(pauseTimer);
    window.clearInterval(fadeTimer);
    enabled = false;
    updateButton();
    if (audio.paused) return;
    fadeVolume(0);
    pauseTimer = window.setTimeout(() => {
      if (!enabled && !disposed) audio.pause();
    }, 1150);
  }

  function onClick(): void {
    if (enabled) stop();
    else void playFromGesture();
  }
  function onPageHide(): void {
    ++operation;
    window.clearInterval(fadeTimer);
    window.clearTimeout(pauseTimer);
    enabled = false;
    audio.pause();
    updateButton();
  }
  button.addEventListener('click', onClick);
  window.addEventListener('pagehide', onPageHide);

  return {
    button, playFromGesture, stop,
    destroy: () => {
      if (disposed) return;
      disposed = true;
      ++operation;
      window.clearInterval(fadeTimer);
      window.clearTimeout(pauseTimer);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      button.removeEventListener('click', onClick);
      window.removeEventListener('pagehide', onPageHide);
    }
  };
}
