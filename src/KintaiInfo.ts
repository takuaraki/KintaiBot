export class KintaiInfo {
  constructor(private targetDate: string, private userName: string, private bodyText: string) {}

  getTargetDate(): string {
    return this.targetDate;
  }

  getUserName(): string {
    return this.userName;
  }

  getBodyText(): string {
    return this.bodyText;
  }
}
