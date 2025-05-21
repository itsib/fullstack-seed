import type { Reviver } from './types';

/**
 * Parse JSON string serialized by #serialize function.
 * Converts serialized Bigint, Map, Set back to javascript objects.
 *
 * @example
 * ```typescript
 * import { deserialize } from '@app/utils/serializer';
 *
 * const map = deserialize('{"__type":"Map","value":[["key-name","1000"]]}');
 *
 * // This will javascript Map object.
 * if (map instanceof Map) {
 *    console.log(map.get('key-name')); // Output: '1000'.
 * }
 *
 * ```
 *
 * @param value
 * @param reviver
 */
export function deserialize<Type>(value: string, reviver?: Reviver): Type {
  return JSON.parse(value, (key, value_) => {
    let value = value_;
    if (value?.__type === 'bigint') value = BigInt(value.value);
    if (value?.__type === 'Map') value = new Map(value.value);
    if (value?.__type === 'Set') value = new Set(value.value);
    return reviver?.(key, value) ?? value;
  });
}
