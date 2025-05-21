import { expect, it } from 'vitest';
import { formatBytes } from './format-bytes';

describe('src/converters/format-bytes.ts', () => {
  it('converts value to number', () => {
    expect(formatBytes(69n, 5)).toEqual('69 Byte');
    expect(formatBytes(123456n, 0)).toEqual('120 kB');
    expect(formatBytes(1300000n, 5)).toEqual('1.23977 MB');
    expect(formatBytes(4200000000000n, 10)).toEqual('3.8198777474 TB');
    expect(formatBytes(20000000000n, 9)).toEqual('18.626451492 GB');
    expect(formatBytes(40000000000000000000n, 18)).toEqual('34.694469519536141888 EB');
    expect(formatBytes(10000000000000n, 18)).toEqual('9.094947017729282379 TB');
    expect(formatBytes(12345n, 4)).toEqual('12.0556 kB');
    expect(formatBytes(6942069420123456789123450000n, 18)).toEqual('5742.345235323362612589 YB');

    expect(formatBytes(-690n, 1)).toEqual('-690 Byte');
    expect(formatBytes(-1300000n, 5)).toEqual('-1.23977 MB');
    expect(formatBytes(-4200000000000n, 10)).toEqual('-3.8198777474 TB');
    expect(formatBytes(-20000000000n, 9)).toEqual('-18.626451492 GB');
    expect(formatBytes(-40000000000000000000n, 18)).toEqual('-34.694469519536141888 EB');
  });
});