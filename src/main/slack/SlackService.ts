import { SlackChannel } from './SlackChannel';
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

/**
 * SlackAPIを扱うクラス
 */
export class SlackService {
  private token: string;

  constructor() {
    this.token = PropertiesService.getScriptProperties().getProperty('SlackOAuthAccessToken');
  }

  /**
   * メッセージを送信する
   */
  postMessage(channel: SlackChannel, text: string) {
    const baseUrl = 'https://slack.com/api/chat.postMessage';
    const url = `${baseUrl}?token=${this.token}&channel=${channel}&text=${encodeURIComponent(
      text
    )}`;
    const options: URLFetchRequestOptions = {
      method: 'post'
    };
    UrlFetchApp.fetch(url, options);
  }

  /**
   * 特定のユーザーにだけ見えるメッセージを送信する
   */
  postEphemeral(channel: SlackChannel, text: string, user: string) {
    const baseUrl = 'https://slack.com/api/chat.postEphemeral';
    const url = `${baseUrl}?token=${this.token}&channel=${channel}&text=${encodeURIComponent(
      text
    )}&user=${user}`;
    const options: URLFetchRequestOptions = {
      method: 'post'
    };
    UrlFetchApp.fetch(url, options);
  }
}
