import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { KintaiInfo, KintaiType } from './KintaiInfo';
import { SlackChannel } from '../slack/SlackChannel';

/**
 * 勤怠を管理するクラス
 */
export class KintaiService {
  private spreadSheet: Spreadsheet;
  private sheet: Sheet;

  constructor(channel: SlackChannel) {
    var folderId = PropertiesService.getScriptProperties().getProperty('KINTAI_FOLDER_ID');
    var kintaiFolder = DriveApp.getFolderById(folderId);
    var kintaiFile = kintaiFolder.getFilesByName(channel).next();
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
    var arrData = [
      [
        kintai.getTargetDate(),
        kintai.getType(),
        kintai.getUserName(),
        kintai.getBodyText(),
        kintai.getUserId()
      ]
    ];
    this.sheet.getRange(newLineRow, 1, 1, 5).setValues(arrData);
  }

  /**
   * 勤怠情報を取得する
   *
   * @param targetDate 取得対象日
   */
  getKintai(targetDate: Date): Array<KintaiInfo> {
    var targetDateText = `${targetDate.getFullYear()}/${targetDate.getMonth() +
      1}/${targetDate.getDate()}`;
    var kintaiInfoArray = new Array<KintaiInfo>();

    var maxRowCount = 10000;
    var kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 4);
    for (var row = 1; row < maxRowCount; row++) {
      var cellData = kintaiValues[row][0];
      if (cellData == '') {
        break;
      }
      var date = cellData as Date;
      if (
        date.getFullYear() == targetDate.getFullYear() &&
        date.getMonth() == targetDate.getMonth() &&
        date.getDate() == targetDate.getDate()
      ) {
        var type = KintaiType.convert(kintaiValues[row][1] as string);
        var name = kintaiValues[row][2] as string;
        var text = kintaiValues[row][3] as string;
        var userId = kintaiValues[row][4] as string;
        kintaiInfoArray.push(new KintaiInfo(targetDateText, type, name, text, userId));
      }
    }
    return kintaiInfoArray;
  }
}
