/** Date helpers that are safe to import from client components. */

export function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function dateParts(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { day: '', month: '', year: '' };
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    year: String(d.getFullYear()),
  };
}
