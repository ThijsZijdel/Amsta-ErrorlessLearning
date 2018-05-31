import {Timer} from "./Timer";

export class Step {
  id: number;
  stepImgLink: string;
  stepDescription: string;
  timer: Timer;

  constructor(id: number, stepImgLink: string, stepDescription: string) {
    this.id = id;
    this.stepImgLink = stepImgLink;
    this.stepDescription = stepDescription;
  }
}
