import { deserialize } from './deserialize';

describe('src/serializer/deserialize.ts', () => {
  describe('#deserialize', () => {
    it('Deserialize Array', () => {
      expect(deserialize('["one"]')).toEqual(['one']);
    });

    it('Deserialize Map', () => {
      const data = new Map();
      data.set('key-name', '1000');

      const deserialized = deserialize('{"__type":"Map","value":[["key-name","1000"]]}');

      expect(deserialized).toBeInstanceOf(Map);
      expect(deserialized).toMatchObject(data);
    });

    it('Deserialize simple Set', () => {
      const data = new Set();
      data.add(1000);
      data.add(2000);

      const deserialized = deserialize('{"__type":"Set","value":[1000,2000]}');

      expect(deserialized).toBeInstanceOf(Set);
      expect(deserialized).toMatchObject(data);
    });

    it('Deserialize Set includes bigint', () => {
      const data = new Set();
      data.add(1000n);

      const deserialized = deserialize('{"__type":"Set","value":[{"__type":"bigint","value":"1000"}]}');

      expect(deserialized).toBeInstanceOf(Set);
      expect(deserialized).toEqual(data);
    });

    it('Deserialize BigInt', () => {
      const data = BigInt(1000);

      const deserialized = deserialize('{"__type":"bigint","value":"1000"}');

      expect(deserialized).toStrictEqual(data);
    });
  });
});
