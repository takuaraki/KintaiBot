import { KintaiService } from './KintaiService';
import { KintaiInfo } from './KintaiInfo';
import { TargetDateExtractor } from './TargetDateExtractor';

declare var global: any;

global.doPost = (event: PostEvent): void => {
  var text = event.parameter['text'];
  var userName = event.parameter['user_name'];
  saveKintai(userName, text);
};

function saveKintai(userName: string, text: string) {
  var now = new Date();
  var kintaiService = new KintaiService(now);
  var targetDateExtractor = new TargetDateExtractor(now);
  var targetDate = targetDateExtractor.extract(text);
  kintaiService.register(new KintaiInfo(targetDate, 'test', text));
  sendToSlack(
    '#bot-test',
    `I saved Kintai. \`name: ${userName} , date: ${targetDate}, text: ${text}\``
  );
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
