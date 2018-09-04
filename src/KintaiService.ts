import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { KintaiInfo } from './KintaiInfo';

/**
 * 勤怠を管理するクラス
 */
export class KintaiService {
  private now: Date;
  private spreadSheet: Spreadsheet;
  private sheet: Sheet;

  constructor(now: Date) {
    this.now = now;
    var folderId = PropertiesService.getScriptProperties().getProperty('KINTAI_FOLDER_ID');
    var kintaiFolder = DriveApp.getFolderById(folderId);
    var kintaiFile = kintaiFolder.getFilesByName('kintai_' + now.getFullYear()).next();
    this.spreadSheet = SpreadsheetApp.open(kintaiFile);
    this.sheet = this.spreadSheet.getSheets()[0];
  }

  /**
   * 勤怠を登録する
   *
   * @param kintai 勤怠情報
   */
  register(kintai: KintaiInfo) {
    var maxRowCount = 10000;
    var kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 3);
    var newLineRow = -1;
    for (var row = 0; row < maxRowCount; row++) {
      var dateCell = kintaiValues[row][0];
      if (dateCell == '') {
        newLineRow = row + 1;
        break;
      }
    }
    var arrData = [[kintai.getTargetDate(), kintai.getUserName(), kintai.getBodyText()]];
    this.sheet.getRange(newLineRow, 1, 1, 3).setValues(arrData);
  }

  /**
   * 今日の勤怠情報を取得する
   */
  getTodaysKintai(): Array<KintaiInfo> {
    var targetDate = `${this.now.getFullYear()}/${this.now.getMonth() + 1}/${this.now.getDate()}`;
    var kintaiInfoArray = new Array<KintaiInfo>();

    var maxRowCount = 10000;
    var kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 3);
    for (var row = 1; row < maxRowCount; row++) {
      var cellData = kintaiValues[row][0];
      if (cellData == '') {
        break;
      }
      var date = cellData as Date;
      if (
        date.getFullYear() == this.now.getFullYear() &&
        date.getMonth() == this.now.getMonth() &&
        date.getDate() == this.now.getDate()
      ) {
        var name = kintaiValues[row][1] as string;
        var text = kintaiValues[row][2] as string;
        kintaiInfoArray.push(new KintaiInfo(targetDate, name, text));
      }
    }
    return kintaiInfoArray;
  }
}
