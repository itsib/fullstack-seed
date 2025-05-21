const UNITS = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function formatOutput(bytesStr: string, isNegative: boolean, unitIndex: number): string {
  if (isNegative) {
    bytesStr = `-${bytesStr}`;
  }

  if (unitIndex < 0) {
    return `${bytesStr} Byte`;
  }
  return `${bytesStr} ${UNITS[unitIndex]}`;
}

/**
 * Humanize file sizes raw bytes
 *
 * @example
 * ```typescript
 * import { formatBytes } from '@app/utils/converters';
 *
 * console.log(formatBytes(1300000n, 5));         // 1.23977 MB
 * console.log(formatBytes(4200000000000n, 10));  // 3.8198777474 TB
 * console.log(formatBytes(20000000000n, 9));     // 18.626451492 GB
 *
 * ```
 *
 * @param {bigint} bytes
 * @param {number} decimalPlaces
 * @return {string}
 */
export function formatBytes(bytes: bigint, decimalPlaces = 1) {
  const thresh = 1024n;
  let u = -1;
  const multiplier = BigInt(10 ** decimalPlaces);

  let isNegative = false;
  if (bytes < 0n) {
    bytes = bytes * -1n;
    isNegative = true;
  }

  if (bytes < thresh) {
    return formatOutput(bytes.toString(), isNegative, -1);
  }

  bytes *= multiplier;

  do {
    bytes /= thresh;
    ++u;
  } while (bytes >= thresh * multiplier && u < UNITS.length - 1);

  let bytesStr = bytes.toString();
  if (decimalPlaces > 0) {
    bytesStr = `${bytesStr.slice(0, -decimalPlaces)}.${bytesStr.slice(-decimalPlaces)}`;
  }

  return formatOutput(bytesStr, isNegative, u);
}
