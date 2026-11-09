import { el } from '../utils/dom.js';
import { recipientByStt } from '../data/recipients.js';
import { validateStt } from '../utils/validateStt.js';

export interface StudentLookupScene { root: HTMLElement; input: HTMLInputElement; form: HTMLFormElement; error: HTMLElement; reset: () => void; }

export function createStudentLookup(onFound: (stt: number) => void): StudentLookupScene {
  const root = el('section', 'scene scene--lookup');
  root.id = 'scene-lookup';
  root.setAttribute('aria-labelledby', 'lookup-title');
  const inner = el('div', 'scene-inner lookup-inner');
  const kicker = el('p', 'eyebrow', 'BƯỚC 01 · TÌM NGÔI SAO CỦA BẠN');
  const heading = el('h2', 'scene-title', 'Mỗi người đều có một');
  const em = el('span', 'headline-italics', 'vị trí riêng trên bầu trời.');
  heading.id = 'lookup-title';
  heading.append(el('br'), em);
  const lead = el('p', 'scene-lead', 'Nhập số thứ tự của bạn trong lớp để tìm lá thư dành riêng cho mình nhé.');
  const form = el('form', 'lookup-form');
  form.noValidate = true;
  const label = el('label', 'input-label', 'SỐ THỨ TỰ TRONG LỚP');
  label.htmlFor = 'student-stt';
  const row = el('div', 'input-row');
  const icon = el('span', 'input-prefix', '✦');
  icon.setAttribute('aria-hidden', 'true');
  const input = el('input', 'stt-input');
  input.id = 'student-stt';
  input.name = 'stt';
  input.type = 'text';
  input.inputMode = 'numeric';
  input.pattern = '[0-9]*';
  input.autocomplete = 'off';
  input.maxLength = 4;
  input.placeholder = 'Ví dụ: 19';
  input.setAttribute('enterkeyhint', 'go');
  input.setAttribute('aria-describedby', 'lookup-helper lookup-error');
  input.setAttribute('aria-required', 'true');
  row.append(icon, input);
  const helper = el('p', 'input-hint', 'Chỉ cần STT của riêng bạn · Từ 01 đến 46');
  helper.id = 'lookup-helper';
  const error = el('p', 'input-error');
  error.id = 'lookup-error';
  error.setAttribute('role', 'status');
  error.setAttribute('aria-live', 'polite');
  const button = el('button', 'primary-btn lookup-btn', 'Thắp sáng ngôi sao của mình');
  button.type = 'submit';
  button.append(el('span', 'btn-sparkle', '✦'));
  const aside = el('p', 'lookup-footnote', 'Món quà này không yêu cầu đăng nhập và không lưu số bạn nhập.');
  form.append(label, row, helper, error, button);
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    const result = validateStt(input.value);
    if (!result.ok) {
      error.textContent = result.message;
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    if (!recipientByStt.has(result.stt)) {
      error.textContent = 'STT này hiện chưa có thư riêng trong món quà. Bạn hãy kiểm tra lại số của mình nhé.';
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    onFound(result.stt);
  });
  input.addEventListener('input', () => { error.textContent = ''; input.removeAttribute('aria-invalid'); });
  inner.append(kicker, heading, lead, form, aside);
  root.append(inner);
  return { root, input, form, error, reset: () => { form.reset(); error.textContent = ''; input.removeAttribute('aria-invalid'); } };
}
