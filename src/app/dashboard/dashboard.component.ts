import { Component, OnInit } from '@angular/core';
import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {ResidentService} from "../services/resident.service";
import {Resident} from "../models/Resident";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private currentTime: string;
  private currentHour: number;
  private currentMinute: number;

  protected pastTasks: Task[] = [];
  protected currentTasks: Task[] = [];
  protected upcommingTasks: Task[] = [];

  protected amountOfPastTasksDisplayIndex: number = 4;
  protected showAllPastTasksButtonText: string = "Laat zien";

  protected amountOfUpcomingTasksDisplayIndex: number = 4;
  protected showAllUpcomingTasksButtonText: string= "Laat zien";

  protected resident: Resident = null;

  constructor(private taskService: TaskService,
              private residentService: ResidentService) { }

  /**
   * On initialize get those tasks.
   */
  ngOnInit() {
    this.initializeTime();
    //this.getTasks();
    this.getFilteredTasks();

    this.getResident();

  }

  /**
   * Get all the tasks and put them in the right arrays
   * 3 possibilities: past, current and upcoming.
   * @author Thijs Zijdel
   */
  private getFilteredTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      //loop trough all the tasks
      for(let task of tasks){
        //loop trough all the task times
        for(let time of task.taskTimes){

          //check in wich array the task must be added.

          if (this.isNow(time.startTime, time.endTime)) {
            this.currentTasks.push(task);

          } else if (this.isUpcoming(time.startTime)){
            this.upcommingTasks.push(task);

          } else if (this.isPast(time.endTime) && this.isNotAlreadyInPast(task)){
            this.pastTasks.push(task);
          }

        }
      }

    });
  }

  /**
   * Method for setting up the current time
   * @author Thijs Zijdel
   */
  private initializeTime():void {
    var now = new Date();
    this.currentTime = now.getHours()+":"+now.getMinutes();
    this.currentHour = parseInt(this.currentTime.substring(0, this.currentTime.indexOf(":")));
    this.currentMinute = parseInt(this.currentTime.substring(this.currentTime.indexOf(":") + 1,this.currentTime.length));
  }

  /**
   * Method for checking if an time is past the current time
   * @param {string} endTime  (format:  09:00)
   * @returns {boolean} true if it is past, false if it isn't
   * @author Thijs Zijdel
   */
  protected isPast(endTime: string) {
    return(this.currentMinute >= this.getMinute(endTime) &&
      this.currentHour >= this.getHour(endTime));
  }

  /**
   * Method for checking if an time is in the current time
   * @param {string} startTime  (format:  09:00)
   * @param {string} endTime    (format:  09:00)
   * @returns {boolean} true if it is now, false if it isn't
   * @author Thijs Zijdel
   * @author Lucas - minute validation
   */
  protected isNow(startTime: string, endTime: string) {
    //check if current time is within the end and start time of the task
    return(
      this.currentHour >= this.getHour(startTime) &&
      this.currentHour <= this.getHour(endTime));

    //this.currentMinute >= this.getMinute(startTime) &&
    //this.currentMinute <= this.getMinute(endTime) &&
  }

  /**
   * Method for checking if an time is upcoming
   * @param {string} startTime  (format:  09:00)
   * @returns {boolean} true if it is upcoming, false if it isn't
   * @author Thijs Zijdel
   */
  protected isUpcoming(startTime: string){
    return(this.currentHour <= this.getHour(startTime));

    //this.currentMinute <= this.getMinute(startTime) &&
  }

  /**
   * Method for toggling the amount of tasks that are displayed (PAST TASKS)
   * Standard index = 4, toggle to 99 (limited)
   * @author thijs zijdel
   */
  protected toggleDisplayAmountPastTasks() {
    if (this.amountOfPastTasksDisplayIndex==4) {
      this.amountOfPastTasksDisplayIndex = 99;
      this.showAllPastTasksButtonText = "Verstop ze"
    } else {
      this.amountOfPastTasksDisplayIndex = 4;
      this.showAllPastTasksButtonText = "Laat zien";
    }
  }

  /**
   * Method for toggling the amount of tasks that are displayed (UPCOMING TASKS)
   * Standard index = 4, toggle to 99 (limited)
   * @author thijs zijdel
   */
  protected toggleDisplayAmountUpcomingTasks() {
    if (this.amountOfUpcomingTasksDisplayIndex==4) {
      this.amountOfUpcomingTasksDisplayIndex = 99;
      this.showAllUpcomingTasksButtonText = "Verstop ze"
    } else {
      this.amountOfUpcomingTasksDisplayIndex = 4;
      this.showAllUpcomingTasksButtonText = "Laat zien";
    }
  }

  /**
   * Method for validating if an task is not already added to the past tasks array
   * @param {Task} checkTask; task that will be checked
   * @returns {boolean} true if it not already added.
   * @author Thijs Zijdel
   */
  private isNotAlreadyInPast(checkTask: Task) {
    let addThisTask: boolean = true;
    for(let task of this.pastTasks){
      if (checkTask.id == task.id)
        addThisTask = false;
    }
    return addThisTask
  }





  /**
   * Method for getting the minutes out an time string
   * @param {string} time     (format:   09:00 )
   * @returns {number} minutes
   * @author Thijs Zijdel
   */
  public getMinute(time: string) {
    return parseInt(time.substring(time.indexOf(":") + 1, time.length));


  }

  /**
   * Method for getting the hours out an time string
   * @param {string} time     (format:   09:00)
   * @returns {number} hours
   * @author Thijs Zijdel
   */
  public getHour(time: string) {
    return parseInt(time.substring(0, time.indexOf(":")));
  }

  private getResident() {
    this.resident = this.residentService.loggedInResident;
  }
}
