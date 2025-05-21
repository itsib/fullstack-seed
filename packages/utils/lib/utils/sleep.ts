/**
 * Pause JavaScript execution for a specified amount
 * of time in milliseconds using Promises. Works
 * elegantly with async/await.
 *
 * @example
 * ```typescript
 * import { sleep } from '@app/utils';
 *
 * async function run() {
 *    // ...
 *    await sleep(1000); // Runtime delay 1 second
 * }
 * ```
 *
 * @param ms Delay in milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
