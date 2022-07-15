export function base64ToBlob(base64: string, type: string) {
  const bytes = window.atob(base64);
  const len = bytes.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = bytes.charCodeAt(i);
  }
  return new Blob([buffer], { type });
}
