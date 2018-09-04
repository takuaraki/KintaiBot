import { SheetService } from './sheet.service';
import { KintaiService } from './KintaiService';
import { KintaiInfo } from './KintaiInfo';
import { TargetDateExtractor } from './TargetDateExtractor';

declare var global: any;

global.createNewFile = (): void => {
  const ss = SheetService.createInitialFile('New file');
  ss.getRange('A2').setValue('Happy gas!');
};

global.doPost = (event: PostEvent): void => {
  var now = new Date();
  var kintaiService = new KintaiService(now);
  var targetDateExtractor = new TargetDateExtractor(now);
  var bodyText = '【A休】9/2 体調不良のため';
  var targetDate = targetDateExtractor.extract(bodyText);
  kintaiService.register(new KintaiInfo(targetDate, 'test', bodyText));
};

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
