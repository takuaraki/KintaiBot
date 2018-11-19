import { NameExtractor } from '../../main/extractors/NameExtractor';

describe('NameExtractor', () => {
  describe('extract', () => {
    it('regular case', () => {
      expect(NameExtractor.extract('【A休】【荒木】09/05 私用のため')).toBe('荒木');
    });
    it('include space', () => {
      expect(NameExtractor.extract('【A休】    【荒木】09/05 私用のため')).toBe('荒木');
    });
    it('no name', () => {
      expect(NameExtractor.extract('【A休】09/05 私用のため')).toBe(null);
    });
  });
});
