import { serialize } from './serialize';

describe('src/serializer/serialize.ts', () => {
  describe('#serialize', () => {
    it('Serialize Array', () => {
      const array = ['one'];
      expect(serialize(array)).toEqual('["one"]');
    });

    it('Serialize Map', () => {
      const data = new Map();
      data.set('key-name', '1000');

      expect(serialize(data)).toEqual('{"__type":"Map","value":[["key-name","1000"]]}');
    });

    it('Serialize Set', () => {
      const data = new Set();
      data.add(1000n);
      data.add(2000n);

      expect(serialize(data)).toEqual('{"__type":"Set","value":[{"__type":"bigint","value":"1000"},{"__type":"bigint","value":"2000"}]}');
    });

    it('Serialize BigInt', () => {
      const data = BigInt(1000);

      expect(serialize(data)).toEqual('{"__type":"bigint","value":"1000"}');
    });
  });
});
