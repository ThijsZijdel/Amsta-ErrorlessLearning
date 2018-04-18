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
    //this.getTasks();
    this.getFilteredTasks();
  }

  /**
   * Get all the tasks
   * @author Thijs Zijdel
   */
  getFilteredTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      for(let task of tasks){

        for(let time of task.taskTimes){

          if (this.isNow(time.startTime, time.endTime)) {
            this.currentTasks.push(task);

          } else if (this.isUpcoming(time.startTime)){
            this.upcommingTasks.push(task);

          } else if (this.isPast(time.endTime)){
            this.pastTasks.push(task);
          }

        }
      }

    });
  }

  private getMinute(time: string) {
    return parseInt(time.substring(time.indexOf(":"),time.length));

  }

  private getHour(time: string) {
    return parseInt(time.substring(0, time.indexOf(":")));

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


  isPast(endTime: string) {
    return (this.currentHour >= this.getHour(endTime));
  }

  isNow(startTime: string, endTime: string) {
    //TODO validate minutes
    return(this.currentHour >= this.getHour(startTime) && this.currentHour <= this.getHour(endTime)) ;
  }

  isUpcoming(startTime: string){
    return (this.currentHour <= this.getHour(startTime));
  }
}
