import { SlackChannel } from './SlackChannel';

/**
 * SlackAPIを扱うクラス
 */
export class SlackService {
  private channel: SlackChannel;
  private token: string;

  constructor(channel: SlackChannel) {
    this.channel = channel;
    this.token = PropertiesService.getScriptProperties().getProperty('SlackOAuthAccessToken');
  }

  /**
   * 特定のユーザーにだけ見えるメッセージを送信する
   */
  postEphemeral(text: string, user: string) {
    var baseUrl = 'https://slack.com/api/chat.postEphemeral';
    var url = `${baseUrl}?token=${this.token}&channel=${this.channel}&text=${text}&user=${user}`;
    UrlFetchApp.fetch(url);
  }
}
