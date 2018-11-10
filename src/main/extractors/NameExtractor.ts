/**
 * Slackの本文から投稿者の名前を抽出するクラス
 */
export class NameExtractor {
  private static regexpName = /【(.+?)】.*【(.+?)】/;

  /**
   * 名前を抽出する
   *
   * @param text Slackの本文
   */
  static extract(text: string): string | null {
    let matchResult = text.match(this.regexpName);
    if (matchResult == null) {
      return null;
    }
    return matchResult[2];
  }
}
