export function parseNumber(input: string): number | null {
  const num = parseInt(input);
  return isNaN(num) ? null : num;
}
