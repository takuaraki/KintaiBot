import { PostEvent } from './PostEvent';
import { KintaiService } from './kintai/KintaiService';
import { SlackChannel } from './slack/SlackChannel';
import { MessageGenerator } from './generators/MessageGenerator';

declare let global: any;

global.doPost = (event: PostEvent): object => {
  const userId = event.parameter['user_id'];
  const channel = SlackChannel.convert(event.parameter['channel_name']);
  if (channel == null) {
    return createOutput('/kintai は、このチャンネルには対応していません :bow:');
  }
  const message = getKintaiList(channel, userId);
  if (message == null) {
    return createOutput('登録されている勤怠情報はありません。');
  }
  return createOutput('登録されている勤怠情報\n' + message);
};

/**
 * コマンドの実行結果を返す
 *
 * @param text
 */
function createOutput(text: string): GoogleAppsScript.Content.TextOutput {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(
      JSON.stringify({
        text: text
      })
    );
}

/**
 * ユーザーの現在日以降の勤怠リストを送信する
 *
 * @param channel Slackのチャンネル
 * @param userId  SlackのユーザーID
 */
function getKintaiList(channel: SlackChannel, userId: string): string {
  const kintaiService = new KintaiService(channel);
  const kintaiInfoArray = kintaiService.getKintaiList(userId);

  if (kintaiInfoArray.length == 0) {
    return null;
  }

  let message = '';
  kintaiInfoArray.forEach(kintaiInfo => {
    const body = MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText());
    message += `${kintaiInfo.getTargetDate()} ${kintaiInfo.getType()} ${body}\n`;
  });

  return message;
}
