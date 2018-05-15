import {Resident} from "./Resident";
import {Task} from "./Task";

export class Activity {
  id: string;
  name: string;
  date: Date;

  timeStart: string;
  timeEnd: string;

  timeStarted: string;
  timeEnded: string;
  completedTime: string;
  completed: boolean;

  residentId: string;
  taskId: number;

  constructor(id: string, name: string, date: Date,
              timeStart: string, timeEnd: string,

              timeStarted: string, timeEnded: string,
              completedTime: string, completed: boolean,

              residentId: string,taskId: number) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;

    this.timeStarted = timeStarted;
    this.timeEnded = timeEnded;

    this.completedTime = completedTime;
    this.completed = completed;

    this.residentId = residentId;

    this.taskId = taskId;
  }
}
