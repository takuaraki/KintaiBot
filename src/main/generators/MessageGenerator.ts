import { KintaiInfo, KintaiType } from '../kintai/KintaiInfo';

export class MessageGenerator {
  static generate(today: string, kintaiInfoArray: Array<KintaiInfo>): string {
    let message = `${today} の勤怠です。\n\`\`\`\n`;

    const A休_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.休み;
    });
    if (A休_Array.length > 0) {
      message += '【休み】\n';
      const tableData = new Array<Array<string>>();
      A休_Array.forEach(kintaiInfo => {
        tableData.push([
          kintaiInfo.getUserName(),
          MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText())
        ]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n\n`;
    }

    const AM休_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.AM休;
    });
    if (AM休_Array.length > 0) {
      message += '【午前休】\n';
      const tableData = new Array<Array<string>>();
      AM休_Array.forEach(kintaiInfo => {
        tableData.push([
          kintaiInfo.getUserName(),
          MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText())
        ]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n\n`;
    }

    const PM休_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.PM休;
    });
    if (PM休_Array.length > 0) {
      message += '【午後休】\n';
      const tableData = new Array<Array<string>>();
      PM休_Array.forEach(kintaiInfo => {
        tableData.push([
          kintaiInfo.getUserName(),
          MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText())
        ]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n\n`;
    }

    const FT_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.FT;
    });
    if (FT_Array.length > 0) {
      message += '【FT】\n';
      const tableData = new Array<Array<string>>();
      FT_Array.forEach(kintaiInfo => {
        tableData.push([
          kintaiInfo.getUserName(),
          MessageGenerator.removeUnnecessaryText(kintaiInfo.getBodyText())
        ]);
      });
      message += `${MessageGenerator.createTable(tableData)}`;
    }

    const その他_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.その他;
    });
    if (その他_Array.length > 0) {
      message += '\n\n【その他】\n';
      const tableData = new Array<Array<string>>();
      その他_Array.forEach(kintaiInfo => {
        const noDateText = this.removeDate(kintaiInfo.getBodyText());
        const noDayOfTheWeekText = this.removeDayOfTheWeek(noDateText);
        tableData.push([kintaiInfo.getUserName(), noDayOfTheWeekText.replace(/ /g, '')]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n`;
    }

    message += '```';
    return message;
  }

  static removeUnnecessaryText(text: string): string {
    const noLenticularText = this.removeLenticularBrackets(text);
    const noDateText = this.removeDate(noLenticularText);
    const noDayOfTheWeekText = this.removeDayOfTheWeek(noDateText);
    return noDayOfTheWeekText.trim();
  }

  /**
   * remove linticular brackets (in Japanese: 隅付き括弧).
   * @param text
   */
  static removeLenticularBrackets(text: string): string {
    return text.replace(/【.+?】/g, '');
  }

  static removeDate(text: string): string {
    return text.replace(
      /(?:(?:\d{4}\/|)(?:[1-9]|0[1-9]|1[0-2])\/(?:\d{1,2})|(?:\d{4}-|)(?:[1-9]|0[1-9]|1[0-2])-(?:\d{1,2})|(?:\d{4}年|)(?:[1-9]|0[1-9]|1[0-2])月(?:[1-9]|0[1-9]|[12][0-9]|3[01])日)/,
      ''
    );
  }

  static removeDayOfTheWeek(text: string): string {
    return text.replace(/(?:\(|（)(?:月|火|水|木|金)(?:\)|）)/g, '');
  }

  static createTable(rows_: Array<Array<string>>): string {
    const opts = new TableOption();
    const hsep = opts.hsep === undefined ? '  ' : opts.hsep;
    const align = opts.align || [];
    const stringLength = function(s) {
      return String(s).length;
    };

    const dotsizes = MessageGenerator.reduce(
      rows_,
      function(acc, row) {
        MessageGenerator.forEach(row, function(c, ix) {
          const n = MessageGenerator.dotindex(c);
          if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
      },
      []
    );

    const rows = MessageGenerator.map(rows_, function(row) {
      return MessageGenerator.map(row, function(c_, ix) {
        const c = String(c_);
        if (align[ix] === '.') {
          const index = MessageGenerator.dotindex(c);
          const size = dotsizes[ix] + (/\./.test(c) ? 1 : 2) - (stringLength(c) - index);
          return c + Array(size).join(' ');
        } else return c;
      });
    });

    const sizes = MessageGenerator.reduce(
      rows,
      function(acc, row) {
        MessageGenerator.forEach(row, function(c, ix) {
          const n = stringLength(c);
          if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
      },
      []
    );

    return MessageGenerator.map(rows, function(row) {
      return MessageGenerator.map(row, function(c, ix) {
        const n = sizes[ix] - stringLength(c) || 0;
        const s = Array(Math.max(n + 1, 1)).join(' ');
        if (align[ix] === 'r' || align[ix] === '.') {
          return s + c;
        }
        if (align[ix] === 'c') {
          return Array(Math.ceil(n / 2 + 1)).join(' ') + c + Array(Math.floor(n / 2 + 1)).join(' ');
        }

        return c + s;
      })
        .join(hsep)
        .replace(/\s+$/, '');
    }).join('\n');
  }

  static dotindex(c: string) {
    const m = /\.[^.]*$/.exec(c);
    return m ? m.index + 1 : c.length;
  }

  static reduce(xs, f, init) {
    if (xs.reduce) return xs.reduce(f, init);
    let i = 0;
    const acc = arguments.length >= 3 ? init : xs[i++];
    for (; i < xs.length; i++) {
      f(acc, xs[i], i);
    }
    return acc;
  }

  static forEach(xs, f) {
    if (xs.forEach) return xs.forEach(f);
    for (let i = 0; i < xs.length; i++) {
      f.call(xs, xs[i], i);
    }
  }

  static map(xs, f) {
    if (xs.map) return xs.map(f);
    const res = [];
    for (let i = 0; i < xs.length; i++) {
      res.push(f.call(xs, xs[i], i));
    }
    return res;
  }
}

class TableOption {
  hsep: string;
  align: Array<string>;
}
