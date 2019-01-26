import { KintaiService } from './kintai/KintaiService';
import { KintaiInfo } from './kintai/KintaiInfo';
import { TargetDateExtractor } from './extractors/TargetDateExtractor';
import { KintaiTypeExtractor } from './extractors/KintaiTypeExtractor';
import { MessageGenerator } from './generators/MessageGenerator';
import { SlackChannel } from './slack/SlackChannel';
import { NameExtractor } from './extractors/NameExtractor';
import { InputTextExtractor } from './extractors/InputTextExtractor';
import { SlackService } from './slack/SlackService';
import { PostEvent } from './PostEvent';

declare let global: any;

global.doPost = (event: PostEvent): void => {
  const text = event.parameter['text'];
  const channel = SlackChannel.convert(event.parameter['channel_name']);
  if (text == 'Reminder: 今日の勤怠は？') {
    sendTodaysKintai(channel);
  } else if (text == 'Reminder: 明日の勤怠は？') {
    sendNextDaysKintai(channel);
  } else {
    const userId = event.parameter['user_id'];
    const userName = event.parameter['user_name'];
    const inputTexts = InputTextExtractor.extract(text);
    inputTexts.forEach(input => {
      saveKintai(channel, userId, userName, input);
    });
  }
};

/**
 * 勤怠情報を記録する
 *
 * @param channel  Slackのチャンネル
 * @param userName ユーザー名
 * @param userId   SlackのユーザーID
 * @param text     本文
 */
function saveKintai(channel: SlackChannel, userId: string, userName: string, text: string) {
  const now = new Date();
  const kintaiService = new KintaiService(channel);
  const targetDateExtractor = new TargetDateExtractor(now);
  const targetDate = targetDateExtractor.extract(text);
  const kintaiType = KintaiTypeExtractor.extract(text);
  const extractedName = NameExtractor.extract(text);
  const name = extractedName != null ? extractedName : userName;
  kintaiService.register(new KintaiInfo(targetDate, kintaiType, userId, name, text));

  const slackService = new SlackService();
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
  const now = new Date();
  const kintaiService = new KintaiService(channel);
  const kintaiInfoArray = kintaiService.getKintai(now);
  if (kintaiInfoArray.length > 0) {
    const today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    const slackService = new SlackService();
    slackService.postMessage(channel, MessageGenerator.generate(today, kintaiInfoArray));
  }
}

/**
 * 明日の勤怠を送信する
 *
 * @param channel Slackのチャンネル名
 */
function sendNextDaysKintai(channel: SlackChannel) {
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const kintaiService = new KintaiService(channel);
  const kintaiInfoArray = kintaiService.getKintai(nextDay);
  if (kintaiInfoArray.length > 0) {
    const today = `${nextDay.getFullYear()}/${nextDay.getMonth() + 1}/${nextDay.getDate()}`;
    const slackService = new SlackService();
    slackService.postMessage(channel, MessageGenerator.generate(today, kintaiInfoArray));
  }
}
