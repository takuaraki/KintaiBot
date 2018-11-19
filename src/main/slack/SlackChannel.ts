export { SlackChannel };

enum SlackChannel {
  勤怠_開発部 = '勤怠_開発部',
  勤怠_企画部 = '勤怠_企画部',
  botTest = 'bot-test'
}

namespace SlackChannel {
  export function convert(text: string): SlackChannel {
    switch (text) {
      case '勤怠_開発部':
        return SlackChannel.勤怠_開発部;
      case '勤怠_企画部':
        return SlackChannel.勤怠_企画部;
      case 'bot-test':
        return SlackChannel.botTest;
    }
    return null;
  }
}
