import { KintaiType } from './KintaiInfo';
import { KintaiTypeExtractor } from './KintaiTypeExtractor';

describe('TargetDateExtractor', () => {
  describe('extract', () => {
    it('A休 case1', () => {
      expect(KintaiTypeExtractor.extract('【A休】【荒木】09/05 私用のため')).toBe(KintaiType.A休);
    });
    it('A休 case2', () => {
      expect(KintaiTypeExtractor.extract('【A休申請】09/05 私用のため')).toBe(KintaiType.A休);
    });
    it('A休 case2', () => {
      expect(KintaiTypeExtractor.extract('【休み】09/05 私用のため')).toBe(KintaiType.A休);
    });
    it('AM休 case1', () => {
      expect(KintaiTypeExtractor.extract('【AM休】09/05 私用のため')).toBe(KintaiType.AM休);
    });
    it('AM休 case2', () => {
      expect(KintaiTypeExtractor.extract('【AM休申請】09/05 私用のため')).toBe(KintaiType.AM休);
    });
    it('AM休 case3', () => {
      expect(KintaiTypeExtractor.extract('【午前休】09/05 私用のため')).toBe(KintaiType.AM休);
    });
    it('AM休 case4', () => {
      expect(KintaiTypeExtractor.extract('【午前休申請】09/05 私用のため')).toBe(KintaiType.AM休);
    });
    it('PM休 case1', () => {
      expect(KintaiTypeExtractor.extract('【PM休】09/05 私用のため')).toBe(KintaiType.PM休);
    });
    it('PM休 case2', () => {
      expect(KintaiTypeExtractor.extract('【PM休申請】09/05 私用のため')).toBe(KintaiType.PM休);
    });
    it('PM休 case3', () => {
      expect(KintaiTypeExtractor.extract('【午後休】09/05 私用のため')).toBe(KintaiType.PM休);
    });
    it('PM休 case4', () => {
      expect(KintaiTypeExtractor.extract('【午後休申請】09/05 私用のため')).toBe(KintaiType.PM休);
    });
    it('FT case1', () => {
      expect(KintaiTypeExtractor.extract('【FT】09/05 私用のため')).toBe(KintaiType.FT);
    });
    it('FT case2', () => {
      expect(KintaiTypeExtractor.extract('【FT申請】09/05 私用のため')).toBe(KintaiType.FT);
    });
    it('その他 case1', () => {
      expect(KintaiTypeExtractor.extract('【ほげ】09/05 私用のため')).toBe(KintaiType.その他);
    });
    it('その他 case2', () => {
      expect(KintaiTypeExtractor.extract('【遅刻申請】8/8（水）9:45出社 大雨でバス遅延の為')).toBe(
        KintaiType.その他
      );
    });
  });
});
