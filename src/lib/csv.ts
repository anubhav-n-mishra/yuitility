/** Flat table export. Nested values remain JSON; spreadsheet formulas are neutralized. */
export function jsonToCsv(input: string, delimiter = ',') {
  const rows: unknown = JSON.parse(input);
  if (!Array.isArray(rows) || !rows.length || rows.some(row => !row || typeof row !== 'object' || Array.isArray(row))) throw new Error('Input must be a non-empty JSON array of objects.');
  const objects = rows as Record<string, unknown>[];
  const headers = [...new Set(objects.flatMap(Object.keys))];
  const cell = (value: unknown) => {
    let text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (/^[\s]*[=+@-]/.test(text) && typeof value !== 'number') text = "'" + text;
    return text.includes(delimiter) || /["\r\n]/.test(text) ? `"${text.replace(/"/g,'""')}"` : text;
  };
  return [headers.map(cell).join(delimiter), ...objects.map(row => headers.map(h => cell(row[h])).join(delimiter))].join('\r\n');
}
