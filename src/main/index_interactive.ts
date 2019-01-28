import { PostEvent } from './PostEvent';

declare let global: any;

global.doPost = (event: PostEvent): object => {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(
      JSON.stringify({
        text: 'delete kintai.'
      })
    );
};
