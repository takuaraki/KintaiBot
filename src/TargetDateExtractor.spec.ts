import { TargetDateExtractor } from './TargetDateExtractor'
jest.unmock('./TargetDateExtractor');

describe('TargetDateExtractor', () => {
    let now = new Date()
    let tester = new TargetDateExtractor(now)
    describe('extract', () => {
        it('slash divide case1', () => {
            expect(tester.extract('【A休申請】9/12 私用のため'))
            .toBe(`${now.getFullYear()}/9/12`)
        })
        it('slash divide case2', () => {
            expect(tester.extract('【A休申請】2018/9/12 私用のため'))
            .toBe(`${now.getFullYear()}/9/12`)
        })
        it('slash divide case3', () => {
            expect(tester.extract('【A休申請】09/12 私用のため'))
            .toBe(`${now.getFullYear()}/09/12`)
        })
        it('slash divide case4', () => {
            expect(tester.extract('【A休申請】09/02 私用のため'))
            .toBe(`${now.getFullYear()}/09/02`)
        })
        it('slash divide case5', () => {
            expect(tester.extract('【A休申請】2018/09/02 私用のため'))
            .toBe(`${now.getFullYear()}/09/02`)
        })

        it('gappi divide case1', () => {
            expect(tester.extract('【A休申請】9月12日 私用のため'))
            .toBe(`${now.getFullYear()}/9/12`)
        })
        it('gappi divide case2', () => {
            expect(tester.extract('【A休申請】2018年9月12日 私用のため'))
            .toBe(`${now.getFullYear()}/9/12`)
        })
        it('gappi divide case3', () => {
            expect(tester.extract('【A休申請】09月12日 私用のため'))
            .toBe(`${now.getFullYear()}/09/12`)
        })
        it('gappi divide case4', () => {
            expect(tester.extract('【A休申請】09月02日 私用のため'))
            .toBe(`${now.getFullYear()}/09/02`)
        })
        it('gappi divide case5', () => {
            expect(tester.extract('【A休申請】2018年09月02日 私用のため'))
            .toBe(`${now.getFullYear()}/09/02`)
        })
    })
})