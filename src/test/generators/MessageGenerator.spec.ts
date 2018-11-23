import { MessageGenerator } from '../../main/generators/MessageGenerator';
import { KintaiInfo, KintaiType } from '../../main/kintai/KintaiInfo';

describe('MessageGenerator', () => {
  describe('generate', () => {
    it('regular case', () => {
      let kintaiInfo = [
        // 休み
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'user_id',
          'b',
          '【A休申請】2018年09月11日（火） 私用のため【b】'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'user_id',
          'hoge',
          '【A休申請】2018-09-11(火) 私用のため【hoge】'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'user_id',
          'hogehogefuga',
          '【A休申請】09/11（火） 私用のため【hogehogefuga】'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'user_id',
          'araki',
          '【A休申請】2018/09/11(火) 私用のため【araki】'
        ),

        // AM
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'user_id',
          'b',
          '【AM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'user_id',
          'hoge',
          '【AM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'user_id',
          'hogehogefuga',
          '【AM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'user_id',
          'araki',
          '【AM休申請】2018/09/11 私用のため'
        ),

        // PM
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'user_id',
          'b',
          '【PM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'user_id',
          'hoge',
          '【PM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'user_id',
          'hogehogefuga',
          '【PM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'user_id',
          'araki',
          '【PM休申請】2018/09/11 私用のため'
        ),

        // FT
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'user_id',
          'b',
          '【FT申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'user_id',
          'hoge',
          '【FT申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'user_id',
          'hogehogefuga',
          '【FT申請】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'user_id',
          'araki',
          '【FT申請】2018/09/11 私用のため'
        ),

        // その他
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'user_id',
          'b',
          '【A休申請取り消し】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'user_id',
          'hoge',
          '【A休申請取り消し】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'user_id',
          'hogehogefuga',
          '【A休申請取り消し】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'user_id',
          'araki',
          '【A休申請取り消し】2018/09/11 私用のため'
        )
      ];
      expect(MessageGenerator.generate('2018/09/11', kintaiInfo)).toBe(expectMessage);
    });
  });
});

let expectMessage = `2018/09/11 の勤怠です。
\`\`\`
【休み】
b             私用のため
hoge          私用のため
hogehogefuga  私用のため
araki         私用のため

【午前休】
b             私用のため
hoge          私用のため
hogehogefuga  私用のため
araki         私用のため

【午後休】
b             私用のため
hoge          私用のため
hogehogefuga  私用のため
araki         私用のため

【FT】
b             私用のため
hoge          私用のため
hogehogefuga  私用のため
araki         私用のため

【その他】
b             【A休申請取り消し】私用のため
hoge          【A休申請取り消し】私用のため
hogehogefuga  【A休申請取り消し】私用のため
araki         【A休申請取り消し】私用のため
\`\`\``;
