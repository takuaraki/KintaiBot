import { InputTextExtractor } from './InputTextExtractor';

describe('InputTextExtractor', () => {
  describe('extract', () => {
    it('regular case', () => {
      var matchResult = InputTextExtractor.extract(text);
      expect(matchResult.length).toBe(2);
      expect(matchResult[0]).toBe("【休み】9/28(金) 体調不良のため【Hoge】");
      expect(matchResult[1]).toBe("【休み】9/29(土) 体調不良のため【Hoge】");
      expect(matchResult[2]).toBe(undefined);
    });
  });
});

let text = `【休み】9/28(金) 体調不良のため【Hoge】
【休み】9/29(土) 体調不良のため【Hoge】
@aaa @fuga
お疲れさまです。Hogeです。
体調不良のため、お休みを頂きます。`;