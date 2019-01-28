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
  const attachments = getKintaiAttachments(channel, userId);
  if (attachments == null) {
    return createOutput('登録されている勤怠情報はありません。');
  }
  return createOutput('登録されている勤怠情報', attachments);
};

/**
 * コマンドの実行結果を返す
 *
 * @param text
 */
function createOutput(text: string, attachments?: object[]): GoogleAppsScript.Content.TextOutput {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(
      JSON.stringify({
        text: text,
        attachments: attachments
      })
    );
}

/**
 * ユーザーの現在日以降の勤怠リストを送信する
 *
 * @param channel Slackのチャンネル
 * @param userId  SlackのユーザーID
 */
function getKintaiAttachments(channel: SlackChannel, userId: string): object[] {
  const kintaiService = new KintaiService(channel);
  const kintaiInfoArray = kintaiService.getKintaiList(userId);

  if (kintaiInfoArray.length == 0) {
    return null;
  }

  const attatchments = kintaiInfoArray.map(kintaiInfo => {
    const body = MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText());
    const text = `${kintaiInfo.getTargetDate()} ${kintaiInfo.getType()} ${body}`;
    return createAttatchment(text);
  });

  return attatchments;
}

function createAttatchment(text: string): object {
  return {
    fallback: '登録されている勤怠です',
    title: text,
    callback_id: 'kintaiId1',
    color: '#3251C2',
    attachment_type: 'default',
    actions: [
      {
        name: 'deleteButton',
        text: '削除',
        type: 'button',
        style: 'danger'
      }
    ]
  };
}
