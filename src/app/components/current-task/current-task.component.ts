import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/Task';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService } from '../../services/task.service';
import { MatStepper } from '@angular/material';


// Steps:
import { Step } from '../../models/Step';
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../models/Resident";
import {TaskTime} from "../../models/TaskTime";
import {Activity} from "../../models/Activity";
import {Timer} from "../../models/Timer";

/**
 * Current task component
 */
@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.css']
})
/**
 * Current task Class
 * implements Initialize (OnInit)
 */
export class CurrentTaskComponent implements OnInit {
  isCompleted = false;
  /**
   * Set current task based on the routers constructor
   * *ngIf="task"
   */
  @Input() task: Task;

  steps: Step[];
  /**
   * Constructor for:
   *
   * Get the route and the location based on the id
   * @param route to task
   * @param taskService connection to the tasks
   * @param location the location
   */
  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private residentService: ResidentService) {
  }

  /**
   * Called on initializing
   */
  ngOnInit() {
    this.getTask();
    this.getSteps();

    //this.startMonitoring();
  }

  /**
   * Getter for the current task
   * note:  this will be setted to @input() task
   *        and used in *ngIf="task"
   * @author Thijs Zijdel
   */
  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  /**
   * Back button
   * @author: Thijs Zijdel
   */
  goBack(): void {
    alert("Geef de iPad terug aan een medewerker.");

    this.location.back();
  }

  /**
   * Step backward with the given matstepper
   * @author Menno Jongejan
   * @param {MatStepper} stepper
   */
  goStepBack(stepper: MatStepper): void {
    //check if the go back button is clicked on the first step
    if (stepper.selectedIndex==0)
      if(this.openClosingMessage())
        this.goBack();


    stepper.selected.completed = false;
    stepper.previous();
  }

  /**
   * Step forward with the given matstepper
   * @author Menno Jongejan
   * @param {MatStepper} stepper
   */
  goStepForward(stepper: MatStepper): void {
    //check if the go forward button is clicked on the last step
    if (stepper.selectedIndex==stepper._steps.length-1)
      if(this.openClosingMessage())
        this.goBack();

    // If there is a timer and it has not been completed do not go forward!
    if (this.task.steps[stepper.selectedIndex-1] != null && this.task.steps[stepper.selectedIndex-1].hasTimer && !this.task.steps[stepper.selectedIndex-1].timer.isCompleted) {
      return;
    }

    stepper.selected.completed = true;
    stepper.next();

    setTimeout(this.stepperChanged(stepper), 250);
  }

  private stepperChanged(stepper: MatStepper): void {
    // If there is a timer and it has not been completed do not go forward!
    if (this.task.steps[stepper.selectedIndex-1] != null && this.task.steps[stepper.selectedIndex-1].hasTimer) {
      this.task.steps[stepper.selectedIndex-1].startTimer();
      return;
    }
  }

  /**
   * For the each current task will this method been called.
   * Based on the routers (task) id will the correct steps gotten.
   * @author: Thijs Zijdel
   */
  private getSteps(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => {
        return this.steps = task.steps;
      });
  }

  /**
   * Message when the tasks is ready to close
   * @returns {boolean} if the tasks need to be stopped
   */
  private openClosingMessage() {
    if (confirm("Wilt u deze taak echt sluiten?")) {
      this.stopMonitoring();
      return true;
    } else {
      return false;
    }
  }


  /**
   * Variables for task monitoring
   */
  private resident: Resident;

  private startDate: Date = null;

  private taskTime: TaskTime;
  private currentTime: string;
  private currentHour: number;
  private currentMinute: number;

  private completed: boolean = false;

  private endedTime: string;



  /**
   * Start monitoring task events for the user (resident)
   */
  private startMonitoring() {
    this.resident = this.residentService.loggedInResident;
    this.startDate = new Date();

    this.initializeTime();


    this.taskTime = this.taskService.getCurrentTaskTime();
  }

  private stopMonitoring() {
    console.log("monitoring stopped");

    var now = new Date();
    this.endedTime = now.getHours()+":"+now.getMinutes();
    this.completed = true;

    this.resident.activities.push(
      new Activity(
        "9",
        this.task.name,
        this.startDate,

        this.taskTime.startTime,
        this.taskTime.endTime,
        this.currentTime,
        this.endedTime,
        (this.getMinute(this.endedTime)-this.getMinute(this.currentTime)).toString(),
        this.completed,
        this.resident.id,
        this.task.id,
        "Automatisch..."));


    this.residentService.updateResident(this.resident);
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
    return(this.currentMinute >= this.getMinute(startTime) &&
      this.currentMinute <= this.getMinute(endTime) &&
      this.currentHour >= this.getHour(startTime) &&
      this.currentHour <= this.getHour(endTime));
  }


  /**
   * Method for setting up the current time
   * @author Thijs Zijdel
   */
  private initializeTime():void {
    var now = new Date();
    this.currentTime = now.getHours()+":"+now.getMinutes();
    this.currentHour = parseInt(this.currentTime.substring(0, this.currentTime.indexOf(":")));
    this.currentMinute = parseInt(this.currentTime.substring(this.currentTime.indexOf(":"),this.currentTime.length));
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

}
