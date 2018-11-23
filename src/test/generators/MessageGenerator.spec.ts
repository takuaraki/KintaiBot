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
          'b',
          '【A休申請】2018年09月11日（火） 私用のため【b】',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'hoge',
          '【A休申請】2018-09-11(火) 私用のため【hoge】',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'hogehogefuga',
          '【A休申請】09/11（火） 私用のため【hogehogefuga】',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.休み,
          'araki',
          '【A休申請】2018/09/11(火) 私用のため【araki】',
          'user_id'
        ),

        // AM
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'b',
          '【AM休申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'hoge',
          '【AM休申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'hogehogefuga',
          '【AM休申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'araki',
          '【AM休申請】2018/09/11 私用のため',
          'user_id'
        ),

        // PM
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'b',
          '【PM休申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'hoge',
          '【PM休申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'hogehogefuga',
          '【PM休申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'araki',
          '【PM休申請】2018/09/11 私用のため',
          'user_id'
        ),

        // FT
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'b',
          '【FT申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'hoge',
          '【FT申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'hogehogefuga',
          '【FT申請】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'araki',
          '【FT申請】2018/09/11 私用のため',
          'user_id'
        ),

        // その他
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'b',
          '【A休申請取り消し】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'hoge',
          '【A休申請取り消し】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'hogehogefuga',
          '【A休申請取り消し】2018/09/11 私用のため',
          'user_id'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'araki',
          '【A休申請取り消し】2018/09/11 私用のため',
          'user_id'
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
