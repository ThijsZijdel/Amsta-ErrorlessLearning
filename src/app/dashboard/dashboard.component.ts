import { Component, OnInit } from '@angular/core';
import {Task} from '../models/task';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentTime: string;
  currentHour: number;
  currentMinute: number;

  pastTasks: Task[] = [];
  currentTasks: Task[] = [];
  upcommingTasks: Task[] = [];



  constructor(private taskService: TaskService) { }

  /**
   * On initialize get those tasks.
   */
  ngOnInit() {
    this.initializeTime();
    this.getTasks();
  }

  /**
   * Get all the tasks
   * @author Thijs Zijdel
   */
  getTasks(): void {


    this.taskService.getTasks().subscribe(tasks => {
      for(let task of tasks){

        for(let time of task.taskTimes){

          let startHour = parseInt(time.startTime.substring(0, time.startTime.indexOf(":")));
          let startMin = parseInt(time.startTime.substring(time.startTime.indexOf(":"),time.startTime.length));

          let endHour = parseInt(time.endTime.substring(0, time.endTime.indexOf(":")));
          let endMin = parseInt(time.endTime.substring(time.endTime.indexOf(":"),time.endTime.length));




          if (this.currentHour >= startHour && this.currentHour <= endHour) {
            //TODO validate minutes
            this.currentTasks.push(task);

          } else if (this.currentHour <= startHour){
            this.upcommingTasks.push(task);
          } else if (this.currentHour >= endHour){
            this.pastTasks.push(task);
          }

        }
      }

    });
  }



  /**
   * Method for setting up the current time
   */
  private initializeTime() {
    var now = new Date();
    this.currentTime = now.getHours()+":"+now.getMinutes();
    this.currentHour = parseInt(this.currentTime.substring(0, this.currentTime.indexOf(":")));
    this.currentMinute = parseInt(this.currentTime.substring(this.currentTime.indexOf(":"),this.currentTime.length));
  }
}
