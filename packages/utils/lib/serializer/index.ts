import * as lz from 'lz-string';
import { serialize } from './serialize';
import { deserialize } from './deserialize';

/**
 * Serializes a javascript object into a JSON
 * string and compresses it using the LZ algorithm.
 *
 * Reading about LZ: https://glinscott.github.io/lz/index.html
 *
 * @param data
 */
export function encode<T>(data: T): string {
  const serialized = serialize(data);
  return lz.compress(serialized);
}

/**
 * Decompress string and deserialize. This
 * is the inverse function for the function above #encode
 *
 * @param data
 */
export function decode<T = unknown>(data: string): T {
  const decompressed = lz.decompress(data);
  return deserialize(decompressed) as T;
}
