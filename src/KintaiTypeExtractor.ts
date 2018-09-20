import { KintaiType } from './KintaiInfo';

/**
 * Slackの本文から勤怠種別を抽出するクラス
 */
export class KintaiTypeExtractor {
  private static regexpType = /【(.+?)】/;

  /**
   * 勤怠種別を抽出する
   *
   * @param text Slackの本文
   */
  static extract(text: string): KintaiType {
    let matchResult = text.match(this.regexpType);
    if (matchResult == null) {
      return KintaiType.その他;
    }
    return KintaiType.convert(matchResult[1]);
  }
}
