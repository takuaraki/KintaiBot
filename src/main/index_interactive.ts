import { PostEvent } from './PostEvent';
import { KintaiService } from './kintai/KintaiService';
import { SlackChannel } from './slack/SlackChannel';
import { InteractivePayload } from './slack/SlackInteractivePayload';
import { SlackService } from './slack/SlackService';

declare let global: any;

global.doPost = (event: PostEvent): object => {
  const payload = JSON.parse(event.parameter.payload) as InteractivePayload;
  const channel = SlackChannel.convert(payload.channel.name);
  const kintaiService = new KintaiService(channel);
  const deletedKintai = kintaiService.deleteKintai(payload.callback_id);
  const slackService = new SlackService();
  slackService.postMessage(channel, `勤怠情報を削除しました:\n\`${deletedKintai.getBodyText()}\``);

  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent('削除結果をチャンネルに投稿しました。');
};
