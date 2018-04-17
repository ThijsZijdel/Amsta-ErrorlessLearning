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

  currentHour: number;

  constructor(private taskService: TaskService) { }

  /**
   * On initialize get those tasks.
   */
  ngOnInit() {
    this.getCurrentTasks();

    var now = new Date();
    this.currentTime = now.getHours()+":"+now.getMinutes();

    this.currentHour = parseInt(this.currentTime.substring(0, this.currentTime.indexOf(":")));
   // this.filterTasks();
  }

  /**
   * Get all the tasks
   * @author Thijs Zijdel
   */
  getCurrentTasks(): void {


    this.taskService.getTasks().subscribe(tasks => {



      for(let taskCheck of tasks){





        for(let time of taskCheck.taskTimes){



          let startHour = parseInt(time.startTime.substring(0, time.startTime.indexOf(":")));
          let startMin = parseInt(time.startTime.substring(time.startTime.indexOf(":"),time.startTime.length));

          let endHour = parseInt(time.endTime.substring(0, time.endTime.indexOf(":")));
          let endMin = parseInt(time.endTime.substring(time.endTime.indexOf(":"),time.endTime.length));

          console.log("test:"+startHour+" from "+time.startTime+" till: "+endHour + "  =_>"+time.endTime);



          if (this.currentHour >= startHour && this.currentHour <= endHour) {
            this.tasks.push(taskCheck);
          }
        }
      }





        //this.tasks = tasks as Task[]

      });
  }

  filterTasks(): void {

      window.alert(this.tasks.length);

      for(let taskCheck of this.tasks){
        for(let time of taskCheck.taskTimes){
          let startHour = time.startTime.substring(0,time.startTime.indexOf(":"));
          console.log("test:"+startHour+" from "+time.startTime);
        }
      }

  }



}
