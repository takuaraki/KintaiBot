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
    const folderId = PropertiesService.getScriptProperties().getProperty('KINTAI_FOLDER_ID');
    const kintaiFolder = DriveApp.getFolderById(folderId);
    const kintaiFile = kintaiFolder.getFilesByName(channel).next();
    this.spreadSheet = SpreadsheetApp.open(kintaiFile);
    this.sheet = this.spreadSheet.getSheets()[0];
  }

  /**
   * 勤怠を登録する
   *
   * @param kintai 勤怠情報
   */
  register(kintai: KintaiInfo) {
    const maxRowCount = 10000;
    const kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 3);
    let newLineRow = -1;
    for (let row = 0; row < maxRowCount; row++) {
      const dateCell = kintaiValues[row][0];
      if (dateCell == '') {
        newLineRow = row + 1;
        break;
      }
    }
    const arrData = [
      [
        kintai.getTargetDate(),
        kintai.getType(),
        kintai.getUserName(),
        kintai.getBodyText(),
        kintai.getUserId(),
        kintai.getId()
      ]
    ];
    this.sheet.getRange(newLineRow, 1, 1, 6).setValues(arrData);
  }

  /**
   * 勤怠情報を取得する
   *
   * @param targetDate 取得対象日
   */
  getKintai(targetDate: Date): Array<KintaiInfo> {
    const targetDateText = `${targetDate.getFullYear()}/${targetDate.getMonth() +
      1}/${targetDate.getDate()}`;
    const kintaiInfoArray = new Array<KintaiInfo>();

    const maxRowCount = 10000;
    const kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 6);
    for (let row = 1; row < maxRowCount; row++) {
      const cellData = kintaiValues[row][0];
      if (cellData == '') {
        break;
      }
      const date = cellData as Date;
      if (
        date.getFullYear() == targetDate.getFullYear() &&
        date.getMonth() == targetDate.getMonth() &&
        date.getDate() == targetDate.getDate()
      ) {
        const type = KintaiType.convert(kintaiValues[row][1] as string);
        const name = kintaiValues[row][2] as string;
        const text = kintaiValues[row][3] as string;
        const userId = kintaiValues[row][4] as string;
        const id = kintaiValues[row][5] as string;
        kintaiInfoArray.push(new KintaiInfo(id, targetDateText, type, userId, name, text));
      }
    }
    return kintaiInfoArray;
  }

  /**
   * ユーザーの現在日以降の勤怠リストを取得する
   *
   * @param userId SlackのユーザーID
   */
  getKintaiList(userId: string): Array<KintaiInfo> {
    const kintaiInfoArray = new Array<KintaiInfo>();

    const maxRowCount = 10000;
    const kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 6);
    for (let row = 1; row < maxRowCount; row++) {
      const cellData = kintaiValues[row][0];
      if (cellData == '') {
        break;
      }
      const registeredUserId = kintaiValues[row][4] as string;
      const date = cellData as Date;
      const previousDay = new Date();
      previousDay.setDate(previousDay.getDate() - 1);
      if (userId == registeredUserId && date > previousDay) {
        const dateText = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        const type = KintaiType.convert(kintaiValues[row][1] as string);
        const name = kintaiValues[row][2] as string;
        const text = kintaiValues[row][3] as string;
        const id = kintaiValues[row][5] as string;
        kintaiInfoArray.push(new KintaiInfo(id, dateText, type, userId, name, text));
      }
    }
    return kintaiInfoArray;
  }

  /**
   * 勤怠情報を削除する
   *
   * @param id 削除したい勤怠のID
   */
  deleteKintai(id: string): void {
    const maxRowCount = 10000;
    const kintaiValues = this.sheet.getSheetValues(1, 1, maxRowCount, 6);
    for (let row = 1; row < maxRowCount; row++) {
      const kintaiId = kintaiValues[row][5] as string;
      if (kintaiId == '') {
        break;
      }
      if (id == kintaiId) {
        this.sheet.deleteRow(row);
        break;
      }
    }
  }
}
