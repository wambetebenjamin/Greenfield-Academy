export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// Kenyan numbers in local or international format, plus generic international.
const PHONE_RE = /^(\+?254|0)?7\d{8}$|^(\+?254|0)?1\d{8}$|^\+?[1-9]\d{7,14}$/;

export function clean(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function isEmail(value: string) {
  return EMAIL_RE.test(value);
}

export function isPhone(value: string) {
  return PHONE_RE.test(value.replace(/[\s()-]/g, ''));
}

export function normalisePhone(value: string) {
  const digits = value.replace(/[\s()-]/g, '');
  if (digits.startsWith('0')) return `+254${digits.slice(1)}`;
  if (digits.startsWith('254')) return `+${digits}`;
  return digits.startsWith('+') ? digits : `+${digits}`;
}

export function reference(prefix: string) {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${prefix}-${stamp}${rand}`;
}
