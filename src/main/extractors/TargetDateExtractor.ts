/**
 * Slackの本文から勤怠日を抽出するクラス
 */
export class TargetDateExtractor {
  private regexpSlash = /(?:\d{4}\/|)([1-9]|0[1-9]|1[0-2])\/(\d{1,2})/;
  private regexpHyphen = /(?:\d{4}-|)([1-9]|0[1-9]|1[0-2])-(\d{1,2})/;
  private regexpGappi = /([1-9]|0[1-9]|1[0-2])月([1-9]|0[1-9]|[12][0-9]|3[01])日/;

  constructor(private now: Date) {}

  /**
   * 勤怠日を抽出する
   *
   * @param text Slackの本文
   */
  extract(text: string): string {
    let matchResult = text.match(this.regexpSlash);
    if (matchResult == null) {
      matchResult = text.match(this.regexpHyphen);
    }
    if (matchResult == null) {
      matchResult = text.match(this.regexpGappi);
    }
    let year = this.now.getFullYear();
    const month = matchResult[1];
    const day = matchResult[2];
    if (parseInt(month) < this.now.getMonth() + 1) {
      year += 1;
    } else if (parseInt(month) == this.now.getMonth() + 1) {
      if (parseInt(day) < this.now.getDate()) {
        year += 1;
      }
    }
    return `${year}/${month}/${day}`;
  }
}
