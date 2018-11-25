import { PostEvent } from './PostEvent';
import { KintaiService } from './kintai/KintaiService';
import { SlackChannel } from './slack/SlackChannel';
import { SlackService } from './slack/SlackService';
import { MessageGenerator } from './generators/MessageGenerator';

declare var global: any;

global.doPost = (event: PostEvent): void => {
  var userId = event.parameter['user_id'];
  var channel = SlackChannel.convert(event.parameter['channel_name']);
  sendKintaiList(channel, userId);
};

/**
 * ユーザーの現在日以降の勤怠リストを送信する
 *
 * @param channel Slackのチャンネル
 * @param userId  SlackのユーザーID
 */
function sendKintaiList(channel: SlackChannel, userId: string) {
  var kintaiService = new KintaiService(channel);
  var kintaiInfoArray = kintaiService.getKintaiList(userId);

  var message = '';
  kintaiInfoArray.forEach(kintaiInfo => {
    var body = MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText());
    message += `${kintaiInfo.getTargetDate()} ${kintaiInfo.getType()} ${body}\n`;
  });

  var slackService = new SlackService();
  slackService.postEphemeral(channel, message, userId);
}
