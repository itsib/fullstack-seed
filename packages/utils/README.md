# Fool-Stack Seed Application Utils Package

This package is shared between front and server applications

## CLI commands

- `npm run test` - Run tests with vitest.
- `npm run build` - Build library in to `./dist` folder.
- `npm run doc` - Generate library documentation from TSDoc comments. 


<!-- TSDOC_START -->

## Functions

- [sleep](#sleep)
- [formatUnits](#formatunits)
- [parseUnits](#parseunits)
- [formatBytes](#formatbytes)
- [serialize](#serialize)
- [deserialize](#deserialize)
- [encode](#encode)
- [decode](#decode)

### sleep

Pause JavaScript execution for a specified amount
of time in milliseconds using Promises. Works
elegantly with async/await.

| Function | Type |
| ---------- | ---------- |
| `sleep` | `(ms: number) => Promise<void>` |

Parameters:

* `ms`: Delay in milliseconds


Examples:

```typescript
import { sleep } from '@app/utils';

async function run() {
   // ...
   await sleep(1000); // Runtime delay 1 second
}
```


### formatUnits

Divides a number by a given exponent of base 10 (10exponent),
and formats it into a string representation of the number

| Function | Type |
| ---------- | ---------- |
| `formatUnits` | `(value: bigint, decimals: number) => string` |

Examples:

```typescript
import { formatUnits } from '@app/utils/converters';

console.log(formatUnits(69n, 5));            // '0.00069'
console.log(formatUnits(420000000000n, 9));  // '420'
```


### parseUnits

Multiplies a string representation of a number
by a given exponent of base 10 (10exponent).

| Function | Type |
| ---------- | ---------- |
| `parseUnits` | `(value: string, decimals?: number) => bigint` |

Parameters:

* `value`: Value to parse, should be represented as number-string.
* `decimals`: Decimal places


Examples:

```typescript
import { parseUnits } from '@app/utils/converters'

parseUnits('69', 1); // Output 690n
parseUnits('13', 5); // Output 1300000n

parseUnits('13', -1); // Throws error
parseUnits('not number string', 1); // Throws error
```


### formatBytes

Humanize file sizes raw bytes

| Function | Type |
| ---------- | ---------- |
| `formatBytes` | `(bytes: bigint, decimalPlaces?: number) => string` |

Examples:

```typescript
import { formatBytes } from '@app/utils/converters';

console.log(formatBytes(1300000n, 5));         // 1.23977 MB
console.log(formatBytes(4200000000000n, 10));  // 3.8198777474 TB
console.log(formatBytes(20000000000n, 9));     // 18.626451492 GB

```


### serialize

Stringifier that handles circular values.
Allows you to convert an object to a JSON string.
Solves the problem of converting BigInt, Map, Set objects to JSON

Forked from https://github.com/planttheidea/fast-stringify

| Function | Type |
| ---------- | ---------- |
| `serialize` | `(value: any, replacer?: StandardReplacer or null or undefined, indent?: number or null or undefined, circularReplacer?: CircularReplacer or null or undefined) => string` |

Parameters:

* `value`: to stringify
* `replacer`: a custom replacer function for handling standard values
* `indent`: the number of spaces to indent the output by
* `circularReplacer`: a custom replacer function for handling circular values


Examples:

```typescript
import { serialize } from '@app/utils/serializer';

serialize({ value: 10n }); // Output: '{"value":{"__type":"bigint","value":"10"}}'

const data = new Set();
data.add(1000n);
data.add(2000n);

serialize(data); // Output: '{"__type":"Set","value":[{"__type":"bigint","value":"1000"},{"__type":"bigint","value":"2000"}]}'

```


### deserialize

Parse JSON string serialized by #serialize function.
Converts serialized Bigint, Map, Set back to javascript objects.

| Function | Type |
| ---------- | ---------- |
| `deserialize` | `<Type>(value: string, reviver?: Reviver or undefined) => Type` |

Examples:

```typescript
import { deserialize } from '@app/utils/serializer';

const map = deserialize('{"__type":"Map","value":[["key-name","1000"]]}');

// This will javascript Map object.
if (map instanceof Map) {
   console.log(map.get('key-name')); // Output: '1000'.
}

```


### encode

Serializes a javascript object into a JSON
string and compresses it using the LZ algorithm.

Reading about LZ: https://glinscott.github.io/lz/index.html

| Function | Type |
| ---------- | ---------- |
| `encode` | `<T>(data: T) => string` |

### decode

Decompress string and deserialize. This
is the inverse function for the function above #encode

| Function | Type |
| ---------- | ---------- |
| `decode` | `<T = unknown>(data: string) => T` |



<!-- TSDOC_END -->