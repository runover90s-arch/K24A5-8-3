export type SttParseResult =
  | { ok: true; stt: number }
  | { ok: false; message: string };

/** Không lộ danh sách người nhận; chỉ kiểm tra cú pháp và khoảng STT 1–46. */
export function validateStt(raw: string): SttParseResult {
  const normalized = raw.trim();
  if (!/^[0-9]+$/.test(normalized)) {
    return { ok: false, message: 'Hãy nhập số thứ tự của bạn bằng chữ số từ 1 đến 46 nhé.' };
  }
  const stt = Number(normalized);
  if (!Number.isSafeInteger(stt) || stt < 1 || stt > 46) {
    return { ok: false, message: 'Số thứ tự hợp lệ nằm trong khoảng từ 1 đến 46.' };
  }
  return { ok: true, stt };
}
