/** Element builder: luôn dùng textContent cho dữ liệu người nhận, tránh HTML injection. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K, className = '', text = ''
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) { resolve(); return; }
    const timer = window.setTimeout(finish, ms);
    function finish() { window.clearTimeout(timer); signal?.removeEventListener('abort', finish); resolve(); }
    signal?.addEventListener('abort', finish, { once: true });
  });
}
