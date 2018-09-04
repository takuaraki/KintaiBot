import { KintaiService } from './KintaiService';
import { KintaiInfo } from './KintaiInfo';
import { TargetDateExtractor } from './TargetDateExtractor';

declare var global: any;

global.doPost = (event: SlackPostEvent): void => {
  saveKintai(event.text);
};

function saveKintai(text: string) {
  var now = new Date();
  var kintaiService = new KintaiService(now);
  var targetDateExtractor = new TargetDateExtractor(now);
  var targetDate = targetDateExtractor.extract(text);
  kintaiService.register(new KintaiInfo(targetDate, 'test', text));
  sendToSlack('save kintai');
}

class SlackPostEvent {
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

  get text(): string {
    return this.parameter['text'];
  }
}

declare function sendToSlack(text: string);
