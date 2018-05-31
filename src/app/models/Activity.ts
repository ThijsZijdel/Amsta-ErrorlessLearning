import {Resident} from "./Resident";
import {Task} from "./Task";

export class Activity {
  id: number;
  name: string;
  date: Date;

  timeStart: string;
  timeEnd: string;

  timeStarted: string;
  timeEnded: string;
  completedTime: string;
  completed: boolean;

  residentId: number;
  taskId: number;

  notes: string;

  constructor(id: number, name: string, date: Date,
              timeStart: string, timeEnd: string,

              timeStarted: string, timeEnded: string,
              completedTime: string, completed: boolean,

              residentId: number,taskId: number,
              notes: string) {
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
    this.notes = notes;
  }
}
