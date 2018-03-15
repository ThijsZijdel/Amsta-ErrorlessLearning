import {Step} from './Step';

export class Task {
  id: number;
  name: string;
  imgLink: string;
  mainDescription: string;
  steps: Step[];

  constructor(id: number, name: string, imgLink: string, mainDescription: string, steps: Step[]) {
    this.id = id;
    this.name = name;
    this.imgLink = imgLink;
    this.mainDescription = mainDescription;
    this.steps = steps;
  }
}
