import { TargetDateExtractor } from './TargetDateExtractor';
jest.unmock('./TargetDateExtractor');

describe('TargetDateExtractor', () => {
  describe('extract', () => {
    let now = new Date(2018, 9 - 1, 4);
    let tester = new TargetDateExtractor(now);

    it('slash divide case1. M/dd', () => {
      expect(tester.extract('【A休申請】9/12 私用のため')).toBe(`${now.getFullYear()}/9/12`);
    });
    it('slash divide case2. yyyy/M/dd', () => {
      expect(tester.extract('【A休申請】2018/9/12 私用のため')).toBe(`${now.getFullYear()}/9/12`);
    });
    it('slash divide case3. 0M/dd', () => {
      expect(tester.extract('【A休申請】09/12 私用のため')).toBe(`${now.getFullYear()}/09/12`);
    });
    it('slash divide case4. 0M/0d', () => {
      expect(tester.extract('【A休申請】09/06 私用のため')).toBe(`${now.getFullYear()}/09/06`);
    });
    it('slash divide case5. yyyy/0M/0d', () => {
      expect(tester.extract('【A休申請】2018/09/06 私用のため')).toBe(`${now.getFullYear()}/09/06`);
    });

    it('gappi divide case1. M月dd日', () => {
      expect(tester.extract('【A休申請】9月12日 私用のため')).toBe(`${now.getFullYear()}/9/12`);
    });
    it('gappi divide case2. yyyy年M月dd日', () => {
      expect(tester.extract('【A休申請】2018年9月12日 私用のため')).toBe(
        `${now.getFullYear()}/9/12`
      );
    });
    it('gappi divide case3. 0M月dd日', () => {
      expect(tester.extract('【A休申請】09月12日 私用のため')).toBe(`${now.getFullYear()}/09/12`);
    });
    it('gappi divide case4. 0M月0d日', () => {
      expect(tester.extract('【A休申請】09月06日 私用のため')).toBe(`${now.getFullYear()}/09/06`);
    });
    it('gappi divide case5. yyyy年0M月0d日', () => {
      expect(tester.extract('【A休申請】2018年09月06日 私用のため')).toBe(
        `${now.getFullYear()}/09/06`
      );
    });

    it('hyphen divide case1. M-dd', () => {
      expect(tester.extract('【A休申請】9-12 私用のため')).toBe(`${now.getFullYear()}/9/12`);
    });
    it('hyphen divide case2. yyyy-M-dd', () => {
      expect(tester.extract('【A休申請】2018-9-12 私用のため')).toBe(`${now.getFullYear()}/9/12`);
    });
    it('hyphen divide case3. 0M-dd', () => {
      expect(tester.extract('【A休申請】09-12 私用のため')).toBe(`${now.getFullYear()}/09/12`);
    });
    it('hyphen divide case4. 0M-0d', () => {
      expect(tester.extract('【A休申請】09-06 私用のため')).toBe(`${now.getFullYear()}/09/06`);
    });
    it('hyphen divide case5. yyyy-0M-0d', () => {
      expect(tester.extract('【A休申請】2018-09-06 私用のため')).toBe(`${now.getFullYear()}/09/06`);
    });
  });

  describe('extract beyond year', () => {
    let now = new Date(2018, 12 - 1, 20);
    let tester = new TargetDateExtractor(now);

    it('kintai for next year', () => {
      // now = 2018/12/20. In this case, 1/8 may mean 2019/1/8.
      expect(tester.extract('【A休申請】1/8 私用のため')).toBe(`${now.getFullYear() + 1}/1/8`);
    });
  });
});
