import { MessageGenerator } from './MessageGenerator';
import { KintaiInfo, KintaiType } from './KintaiInfo';

describe('MessageGenerator', () => {
  describe('generate', () => {
    it('A休 case1', () => {
      let kintaiInfo = [
        new KintaiInfo('2018/09/11', KintaiType.A休, 'b', '【A休申請】2018/09/10 私用のため'),
        new KintaiInfo('2018/09/11', KintaiType.A休, 'hoge', '【A休申請】2018/09/10 私用のため'),
        new KintaiInfo(
          '2018/09/11',
          KintaiType.A休,
          'hogehogefuga',
          '【A休申請】2018/09/10 私用のため'
        ),
        new KintaiInfo('2018/09/11', KintaiType.A休, 'araki', '【A休申請】2018/09/10 私用のため')
      ];
      expect(MessageGenerator.generate('2018/09/11', kintaiInfo)).toBe(
        `2018/09/11 の勤怠です。
\`\`\`
[A休]
b             【A休申請】2018/09/10 私用のため
hoge          【A休申請】2018/09/10 私用のため
hogehogefuga  【A休申請】2018/09/10 私用のため
araki         【A休申請】2018/09/10 私用のため
\`\`\``
      );
    });
  });
});
