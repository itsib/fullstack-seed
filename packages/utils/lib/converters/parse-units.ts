/**
 * Multiplies a string representation of a number
 * by a given exponent of base 10 (10exponent).
 *
 * @example
 * ```typescript
 * import { parseUnits } from '@app/utils/converters'
 *
 * parseUnits('69', 1); // Output 690n
 * parseUnits('13', 5); // Output 1300000n
 *
 * parseUnits('13', -1); // Throws error
 * parseUnits('not number string', 1); // Throws error
 * ```
 *
 * @param value Value to parse, should be represented as number-string.
 * @param decimals Decimal places
 */
export function parseUnits(value: string, decimals: number = 0): bigint {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value)) {
    throw new Error(`NOT_NUMBER`);
  }
  if (decimals < 0) {
    throw new Error(`DEC_LT_0`);
  }

  let [integer, fraction = '0'] = value.split('.');

  const negative = integer.startsWith('-');
  if (negative) integer = integer.slice(1);

  // trim trailing zeros.
  fraction = fraction.replace(/(0+)$/, '');

  // round off if the fraction is larger than the number of decimals.
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1) {
      integer = `${BigInt(integer) + 1n}`;
    }
    fraction = '';
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [fraction.slice(0, decimals - 1), fraction.slice(decimals - 1, decimals), fraction.slice(decimals)];

    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9) fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0');
    else fraction = `${left}${rounded}`;

    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }

    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, '0');
  }

  return BigInt(`${negative ? '-' : ''}${integer}${fraction}`);
}
