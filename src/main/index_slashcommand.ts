import { PostEvent } from './PostEvent';
import { KintaiService } from './kintai/KintaiService';
import { SlackChannel } from './slack/SlackChannel';
import { MessageGenerator } from './generators/MessageGenerator';

declare var global: any;

global.doPost = (event: PostEvent): object => {
  var userId = event.parameter['user_id'];
  var channel = SlackChannel.convert(event.parameter['channel_name']);
  var message = getKintaiList(channel, userId);
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(JSON.stringify({
      "text" :  "登録されている勤怠情報\n" + message
    }));
};

/**
 * ユーザーの現在日以降の勤怠リストを送信する
 *
 * @param channel Slackのチャンネル
 * @param userId  SlackのユーザーID
 */
function getKintaiList(channel: SlackChannel, userId: string): string {
  var kintaiService = new KintaiService(channel);
  var kintaiInfoArray = kintaiService.getKintaiList(userId);

  var message = '';
  kintaiInfoArray.forEach(kintaiInfo => {
    var body = MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText());
    message += `${kintaiInfo.getTargetDate()} ${kintaiInfo.getType()} ${body}\n`;
  });

  return message;
}
