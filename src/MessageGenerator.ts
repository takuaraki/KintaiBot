import { KintaiInfo, KintaiType } from './KintaiInfo';

export class MessageGenerator {
  static generate(today: string, kintaiInfoArray: Array<KintaiInfo>): string {
    var message = `${today} の勤怠です。\n\`\`\`\n`;

    let A休_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.休み;
    });
    if (A休_Array.length > 0) {
      message += '【休み】\n';
      let tableData = new Array<Array<string>>();
      A休_Array.forEach(kintaiInfo => {
        tableData.push([kintaiInfo.getUserName(), kintaiInfo.getBodyText()]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n\n`;
    }

    let AM休_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.AM休;
    });
    if (AM休_Array.length > 0) {
      message += '【午前休】\n';
      let tableData = new Array<Array<string>>();
      AM休_Array.forEach(kintaiInfo => {
        tableData.push([kintaiInfo.getUserName(), kintaiInfo.getBodyText()]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n\n`;
    }

    let PM休_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.PM休;
    });
    if (PM休_Array.length > 0) {
      message += '【午後休】\n';
      let tableData = new Array<Array<string>>();
      PM休_Array.forEach(kintaiInfo => {
        tableData.push([kintaiInfo.getUserName(), kintaiInfo.getBodyText()]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n\n`;
    }

    let FT_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.FT;
    });
    if (FT_Array.length > 0) {
      message += '【FT】\n';
      let tableData = new Array<Array<string>>();
      FT_Array.forEach(kintaiInfo => {
        tableData.push([kintaiInfo.getUserName(), kintaiInfo.getBodyText()]);
      });
      message += `${MessageGenerator.createTable(tableData)}`;
    }

    let その他_Array = kintaiInfoArray.filter(kintaiInfo => {
      return kintaiInfo.getType() == KintaiType.その他;
    });
    if (その他_Array.length > 0) {
      message += '\n\n【その他】\n';
      let tableData = new Array<Array<string>>();
      その他_Array.forEach(kintaiInfo => {
        tableData.push([kintaiInfo.getUserName(), kintaiInfo.getBodyText()]);
      });
      message += `${MessageGenerator.createTable(tableData)}\n`;
    }

    message += '```';
    return message;
  }

  static createTable(rows_: Array<Array<string>>): string {
    let opts = new TableOption();
    var hsep = opts.hsep === undefined ? '  ' : opts.hsep;
    var align = opts.align || [];
    var stringLength = function(s) {
      return String(s).length;
    };

    var dotsizes = MessageGenerator.reduce(
      rows_,
      function(acc, row) {
        MessageGenerator.forEach(row, function(c, ix) {
          var n = MessageGenerator.dotindex(c);
          if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
      },
      []
    );

    var rows = MessageGenerator.map(rows_, function(row) {
      return MessageGenerator.map(row, function(c_, ix) {
        var c = String(c_);
        if (align[ix] === '.') {
          var index = MessageGenerator.dotindex(c);
          var size = dotsizes[ix] + (/\./.test(c) ? 1 : 2) - (stringLength(c) - index);
          return c + Array(size).join(' ');
        } else return c;
      });
    });

    var sizes = MessageGenerator.reduce(
      rows,
      function(acc, row) {
        MessageGenerator.forEach(row, function(c, ix) {
          var n = stringLength(c);
          if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
      },
      []
    );

    return MessageGenerator.map(rows, function(row) {
      return MessageGenerator.map(row, function(c, ix) {
        var n = sizes[ix] - stringLength(c) || 0;
        var s = Array(Math.max(n + 1, 1)).join(' ');
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
    var m = /\.[^.]*$/.exec(c);
    return m ? m.index + 1 : c.length;
  }

  static reduce(xs, f, init) {
    if (xs.reduce) return xs.reduce(f, init);
    var i = 0;
    var acc = arguments.length >= 3 ? init : xs[i++];
    for (; i < xs.length; i++) {
      f(acc, xs[i], i);
    }
    return acc;
  }

  static forEach(xs, f) {
    if (xs.forEach) return xs.forEach(f);
    for (var i = 0; i < xs.length; i++) {
      f.call(xs, xs[i], i);
    }
  }

  static map(xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f.call(xs, xs[i], i));
    }
    return res;
  }
}

class TableOption {
  hsep: string;
  align: Array<string>;
}
