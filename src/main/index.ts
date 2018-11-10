import { KintaiService } from './kintai/KintaiService';
import { KintaiInfo } from './kintai/KintaiInfo';
import { TargetDateExtractor } from './extractors/TargetDateExtractor';
import { KintaiTypeExtractor } from './extractors/KintaiTypeExtractor';
import { MessageGenerator } from './generators/MessageGenerator';
import { SlackChannel } from './slack/SlackChannel';
import { NameExtractor } from './extractors/NameExtractor';
import { InputTextExtractor } from './extractors/InputTextExtractor';
import { SlackService } from './slack/SlackService';

declare var global: any;

global.doPost = (event: PostEvent): void => {
  var text = event.parameter['text'];
  var channel = SlackChannel.convert(event.parameter['channel_name']);
  if (text == 'Reminder: 今日の勤怠は？') {
    sendTodaysKintai(channel);
  } else {
    var userName = event.parameter['user_name'];
    var userId = event.parameter['user_id'];
    var inputTexts = InputTextExtractor.extract(text);
    inputTexts.forEach(input => {
      saveKintai(channel, userName, userId, input);
    });
  }
};

/**
 * 勤怠情報を記録する
 *
 * @param channel  Slackのチャンネル
 * @param userName ユーザー名
 * @param text     本文
 */
function saveKintai(channel: SlackChannel, userName: string, userId: string, text: string) {
  var now = new Date();
  var kintaiService = new KintaiService(channel);
  var targetDateExtractor = new TargetDateExtractor(now);
  var targetDate = targetDateExtractor.extract(text);
  var kintaiType = KintaiTypeExtractor.extract(text);
  var extractedName = NameExtractor.extract(text);
  var name = extractedName != null ? extractedName : userName;
  kintaiService.register(new KintaiInfo(targetDate, kintaiType, name, text));

  var slackService = new SlackService();
  slackService.postMessage(
    SlackChannel.botTest,
    `I saved Kintai. \`date: ${targetDate}, type: ${kintaiType}, name: ${name} , text: ${text}\``
  );
  slackService.postEphemeral(
    channel,
    `勤怠を記録しました。
\`日付: ${targetDate}, 種別: ${kintaiType}, 名前: ${name}, 本文: ${text}\``,
    userId
  );
}

/**
 * 今日の勤怠を送信する
 *
 * @param channel Slackのチャンネル名
 */
function sendTodaysKintai(channel: SlackChannel) {
  var now = new Date();
  var kintaiService = new KintaiService(channel);
  var kintaiInfoArray = kintaiService.getKintai(now);
  if (kintaiInfoArray.length > 0) {
    var today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    var slackService = new SlackService();
    slackService.postMessage(channel, MessageGenerator.generate(today, kintaiInfoArray));
  }
}

class PostEvent {
  queryString: string;
  parameter: { [key: string]: string };
  parameters: { [key: string]: [string] };
  contentLenth: number;
  postData: {
    length: number;
    type: string;
    contents: string;
    name: string;
  };
}