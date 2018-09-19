import { KintaiService } from './KintaiService';
import { KintaiInfo, KintaiType } from './KintaiInfo';
import { TargetDateExtractor } from './TargetDateExtractor';
import { KintaiTypeExtractor } from './KintaiTypeExtractor';
import { MessageGenerator } from './MessageGenerator';
import { SlackChannel } from './SlackChannel';

declare var global: any;

global.doPost = (event: PostEvent): void => {
  var text = event.parameter['text'].split(/\r\n|\r|\n/)[0]; // take first line
  var channel = SlackChannel.convert(event.parameter['channel_name']);
  if (text == 'Reminder: 今日の勤怠は？') {
    sendTodaysKintai(channel);
  } else {
    var userName = event.parameter['user_name'];
    saveKintai(channel, userName, text);
  }
};

/**
 * 勤怠情報を記録する
 *
 * @param channel  Slackのチャンネル
 * @param userName ユーザー名
 * @param text     本文
 */
function saveKintai(channel: SlackChannel, userName: string, text: string) {
  var now = new Date();
  var kintaiService = new KintaiService(channel);
  var targetDateExtractor = new TargetDateExtractor(now);
  var targetDate = targetDateExtractor.extract(text);
  let kintaiType = KintaiTypeExtractor.extract(text);
  kintaiService.register(new KintaiInfo(targetDate, kintaiType, userName, text));
  sendToSlack(
    `#${SlackChannel.botTest}`,
    `I saved Kintai. \`date: ${targetDate}, type: ${kintaiType}, name: ${userName} , text: ${text}\``
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
    sendToSlack(`#${channel}`, MessageGenerator.generate(today, kintaiInfoArray));
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

declare function sendToSlack(channelId: string, text: string);
