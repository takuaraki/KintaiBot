import { KintaiService } from './KintaiService';
import { KintaiInfo } from './KintaiInfo';
import { TargetDateExtractor } from './TargetDateExtractor';
import { KintaiTypeExtractor } from './KintaiTypeExtractor';

declare var global: any;

global.doPost = (event: PostEvent): void => {
  var text = event.parameter['text'];
  if (text == '今日の勤怠は？') {
    sendTodaysKintai();
  } else {
    var userName = event.parameter['user_name'];
    saveKintai(userName, text);
  }
};

function saveKintai(userName: string, text: string) {
  var now = new Date();
  var kintaiService = new KintaiService(now);
  var targetDateExtractor = new TargetDateExtractor(now);
  var targetDate = targetDateExtractor.extract(text);
  let kintaiType = KintaiTypeExtractor.extract(text);
  kintaiService.register(new KintaiInfo(targetDate, kintaiType, userName, text));
  sendToSlack(
    '#bot-test',
    `I saved Kintai. \`date: ${targetDate}, type: ${kintaiType}, name: ${userName} , text: ${text}\``
  );
}

function sendTodaysKintai() {
  var now = new Date();
  var kintaiService = new KintaiService(now);
  var kintaiInfoArray = kintaiService.getTodaysKintai();
  if (kintaiInfoArray.length > 0) {
    var today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    sendToSlack('#bot-test', generateTodaysKintaiMessage(today, kintaiInfoArray));
  }
}

function generateTodaysKintaiMessage(today: string, kintaiInfoArray: Array<KintaiInfo>): string {
  var message = `${today} の勤怠です。\n\`\`\`\n`;
  kintaiInfoArray.forEach(kintaiInfo => {
    message += `${kintaiInfo.getUserName()} ${kintaiInfo.getBodyText()}\n`;
  });
  message += '```';
  return message;
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
