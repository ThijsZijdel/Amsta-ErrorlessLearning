import {Step} from './Step';
import {TaskTime} from './TaskTime';

export class Task {
  id: number;
  name: string;
  imgLink: string;
  mainDescription: string;
  steps: Step[];
  taskTimes: TaskTime[];

  constructor(id: number, name: string, imgLink: string, mainDescription: string, steps: Step[], taskTimes: TaskTime[]) {
    this.id = id;
    this.name = name;
    this.imgLink = imgLink;
    this.mainDescription = mainDescription;
    this.steps = steps;
    this.taskTimes = taskTimes;
  }
}
