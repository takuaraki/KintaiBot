import { MessageGenerator } from './MessageGenerator';
import { KintaiInfo, KintaiType } from './KintaiInfo';

describe('MessageGenerator', () => {
  describe('generate', () => {
    it('A休 case1', () => {
      let kintaiInfo = [
        // A休
        new KintaiInfo('2018/09/11', KintaiType.A休, 'b', '【A休申請】2018/09/11 私用のため'),
        new KintaiInfo('2018/09/11', KintaiType.A休, 'hoge', '【A休申請】2018/09/11 私用のため'),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.A休,
          'hogehogefuga',
          '【A休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo('2018/09/11', KintaiType.A休, 'araki', '【A休申請】2018/09/11 私用のため'),

        // AM
        new KintaiInfo('2018/09/11', KintaiType.AM休, 'b', '【AM休申請】2018/09/11 私用のため'),
        new KintaiInfo('2018/09/11', KintaiType.AM休, 'hoge', '【AM休申請】2018/09/11 私用のため'),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.AM休,
          'hogehogefuga',
          '【AM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo('2018/09/11', KintaiType.AM休, 'araki', '【AM休申請】2018/09/11 私用のため'),

        // PM
        new KintaiInfo('2018/09/11', KintaiType.PM休, 'b', '【PM休申請】2018/09/11 私用のため'),
        new KintaiInfo('2018/09/11', KintaiType.PM休, 'hoge', '【PM休申請】2018/09/11 私用のため'),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.PM休,
          'hogehogefuga',
          '【PM休申請】2018/09/11 私用のため'
        ),
        new KintaiInfo('2018/09/11', KintaiType.PM休, 'araki', '【PM休申請】2018/09/11 私用のため'),

        // FT
        new KintaiInfo('2018/09/11', KintaiType.FT, 'b', '【FT申請】2018/09/11 私用のため'),
        new KintaiInfo('2018/09/11', KintaiType.FT, 'hoge', '【FT申請】2018/09/11 私用のため'),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.FT,
          'hogehogefuga',
          '【FT申請】2018/09/11 私用のため'
        ),
        new KintaiInfo('2018/09/11', KintaiType.FT, 'araki', '【FT申請】2018/09/11 私用のため'),

        // その他
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'b',
          '【A休申請取り消し】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'hoge',
          '【A休申請取り消し】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
          'hogehogefuga',
          '【A休申請取り消し】2018/09/11 私用のため'
        ),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.その他,
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
[A休]
b             【A休申請】2018/09/11 私用のため
hoge          【A休申請】2018/09/11 私用のため
hogehogefuga  【A休申請】2018/09/11 私用のため
araki         【A休申請】2018/09/11 私用のため

[AM休]
b             【AM休申請】2018/09/11 私用のため
hoge          【AM休申請】2018/09/11 私用のため
hogehogefuga  【AM休申請】2018/09/11 私用のため
araki         【AM休申請】2018/09/11 私用のため

[PM休]
b             【PM休申請】2018/09/11 私用のため
hoge          【PM休申請】2018/09/11 私用のため
hogehogefuga  【PM休申請】2018/09/11 私用のため
araki         【PM休申請】2018/09/11 私用のため

[FT]
b             【FT申請】2018/09/11 私用のため
hoge          【FT申請】2018/09/11 私用のため
hogehogefuga  【FT申請】2018/09/11 私用のため
araki         【FT申請】2018/09/11 私用のため

[その他]
b             【A休申請取り消し】2018/09/11 私用のため
hoge          【A休申請取り消し】2018/09/11 私用のため
hogehogefuga  【A休申請取り消し】2018/09/11 私用のため
araki         【A休申請取り消し】2018/09/11 私用のため
\`\`\``;
