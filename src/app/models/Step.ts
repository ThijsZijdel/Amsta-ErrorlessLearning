import {Timer} from "./Timer";

export class Step {
  id: number;
  stepImgLink: string;
  stepDescription: string;
  hasTimer = false;
  timer: Timer;

  constructor(id: number, stepImgLink: string, stepDescription: string) {
    this.id = id;
    this.stepImgLink = stepImgLink;
    this.stepDescription = stepDescription;
  }

  public startTimer(): void {
    if (this.timer != null) {
      this.timer.startTimer();
    }
  }
}
