export class Step {
  id: number;
  stepImgLink: string;
  stepDescription: string;

  constructor(id: number, stepImgLink: string, stepDescription: string) {
    this.id = id;
    this.stepImgLink = stepImgLink;
    this.stepDescription = stepDescription;
  }
}
