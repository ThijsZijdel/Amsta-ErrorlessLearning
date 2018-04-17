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

  tasks: Task[] = [];

  currentTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  /**
   * On initialize get those tasks.
   */
  ngOnInit() {
    this.getTasks();
    this.currentTime = "10:30";

    this.filterTasks();
  }

  /**
   * Get all the tasks
   * @author Thijs Zijdel
   */
  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  filterTasks(): void {
      for(let taskCheck of this.tasks){
        for(let time of taskCheck.taskTimes){
          let startHour = time.startTime.substring(0,time.startTime.indexOf(":"));
          console.log("test:"+startHour+" from "+time.startTime);
        }
      }

  }



}
