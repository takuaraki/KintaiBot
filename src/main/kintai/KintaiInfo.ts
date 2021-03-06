export class KintaiInfo {
  constructor(
    private id: string,
    private targetDate: string,
    private type: KintaiType,
    private userId: string,
    private userName: string,
    private bodyText: string
  ) {}

  getId(): string {
    return this.id;
  }

  getTargetDate(): string {
    return this.targetDate;
  }

  getType(): KintaiType {
    return this.type;
  }

  getUserId(): string {
    return this.userId;
  }

  getUserName(): string {
    return this.userName;
  }

  getBodyText(): string {
    return this.bodyText;
  }
}

export { KintaiType };

enum KintaiType {
  休み = '休み',
  AM休 = 'AM休',
  PM休 = 'PM休',
  FT = 'FT',
  その他 = 'その他'
}

namespace KintaiType {
  export function convert(text: string): KintaiType {
    switch (text) {
      case 'A休':
      case 'A休申請':
      case '休み':
        return KintaiType.休み;
      case 'AM休':
      case 'AM休申請':
      case '午前休':
      case '午前休申請':
        return KintaiType.AM休;
      case 'PM休':
      case 'PM休申請':
      case '午後休':
      case '午後休申請':
        return KintaiType.PM休;
      case 'FT':
      case 'FT申請':
        return KintaiType.FT;
    }
    return KintaiType.その他;
  }

  export function getIndex(type: KintaiType): number {
    switch (type) {
      case KintaiType.休み:
        return 0;
      case KintaiType.AM休:
        return 1;
      case KintaiType.PM休:
        return 2;
      case KintaiType.FT:
        return 3;
    }
    return 4; // その他
  }
}
