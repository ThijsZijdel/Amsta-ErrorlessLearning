export class TaskTime {
  startTime: string;
  endTime: string;

  constructor(startTime: string, endTime: string) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  toString(): string {
    return this.startTime + "-" + this.endTime;
  }

}
