import { el } from '../utils/dom.js';

/** Tiếng ngân nguyên bản được tổng hợp bằng Web Audio; chỉ khởi phát sau khi chạm. */
export function createAudioToggle(): HTMLButtonElement {
  const button = el('button', 'audio-toggle', '♪  Bật âm thanh');
  button.type = 'button';
  button.setAttribute('aria-pressed', 'false');
  button.title = 'Âm thanh tùy chọn, mặc định tắt';
  let ctx: AudioContext | null = null;
  let timer = 0;
  let enabled = false;
  function play(): void {
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.0];
    const oscillators: OscillatorNode[] = [];
    for (let i = 0; i < notes.length; i++) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = notes[i] / 2;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(.015, now + 1.2 + .2 * i);
      gain.gain.exponentialRampToValueAtTime(.0001, now + 4.6);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now); oscillator.stop(now + 4.8);
      oscillators.push(oscillator);
    }
  }
  async function setEnabled(value: boolean): Promise<void> {
    enabled = value;
    button.setAttribute('aria-pressed', String(value));
    button.textContent = value ? '♪  Tắt âm thanh' : '♪  Bật âm thanh';
    window.clearInterval(timer);
    if (value) {
      const AudioContextClass = window.AudioContext;
      if (!AudioContextClass) { enabled = false; button.textContent = 'Không hỗ trợ âm thanh'; button.disabled = true; return; }
      ctx ??= new AudioContextClass();
      try { await ctx.resume(); play(); timer = window.setInterval(play, 7000); }
      catch { enabled = false; button.setAttribute('aria-pressed', 'false'); button.textContent = '♪  Bật âm thanh'; }
    } else if (ctx) await ctx.suspend();
  }
  button.addEventListener('click', () => { void setEnabled(!enabled); });
  window.addEventListener('pagehide', () => { window.clearInterval(timer); void ctx?.close(); }, { once: true });
  return button;
}
