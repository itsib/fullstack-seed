/**
 * Divides a number by a given exponent of base 10 (10exponent),
 * and formats it into a string representation of the number
 *
 * @example
 * ```typescript
 * import { formatUnits } from '@app/utils/converters';
 *
 * console.log(formatUnits(69n, 5));            // '0.00069'
 * console.log(formatUnits(420000000000n, 9));  // '420'
 * ```
 *
 * @param value
 * @param decimals
 */
export function formatUnits(value: bigint, decimals: number): string {
  let display = value.toString();

  const negative = display.startsWith('-');
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, '0');

  let [integer, fraction] = [display.slice(0, display.length - decimals), display.slice(display.length - decimals)];
  fraction = fraction.replace(/(0+)$/, '');
  return `${negative ? '-' : ''}${integer || '0'}${fraction ? `.${fraction}` : ''}`;
}
