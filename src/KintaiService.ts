import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { KintaiInfo } from './KintaiInfo';

/**
 * 勤怠を管理するクラス
 */
export class KintaiService {
  private spreadSheet: Spreadsheet;
  private sheet: Sheet;

  constructor(now: Date) {
    var folderId = PropertiesService.getScriptProperties().getProperty('KINTAI_FOLDER_ID');
    var kintaiFolder = DriveApp.getFolderById(folderId);
    var kintaiFile = kintaiFolder.getFilesByName('kintai_' + now.getFullYear()).next();
    this.spreadSheet = SpreadsheetApp.open(kintaiFile);
    this.sheet = this.spreadSheet.getSheets()[0];
  }

  /**
   * 勤怠を登録する
   *
   * @param targetDate 勤怠対象日
   * @param userName ユーザー名
   * @param bodyText 本文
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
}
