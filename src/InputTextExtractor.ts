/**
 * Slackの本文から勤怠入力の行を抽出するクラス
 */
export class InputTextExtractor {
  /**
   * 勤怠入力の行を抽出する
   *
   * @param text Slackの本文
   */
  static extract(text: string): RegExpMatchArray {
    return text.match(new RegExp("【.*", "g"));
  }
}
