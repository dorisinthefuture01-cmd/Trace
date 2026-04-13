/** Figma-style: 2026/3/12 */
export function formatRecordDate(isoDate: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (m) {
    return `${Number(m[1])}/${Number(m[2])}/${Number(m[3])}`;
  }
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
