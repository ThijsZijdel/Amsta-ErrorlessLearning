import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {Step} from '../../models/Step';
import {FormControl, Validators} from "@angular/forms";
import {StatusService} from "../login/status.service";
import {TaskTime} from "../../models/TaskTime";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  /**
   * The tasks from taskService
   */
  tasks: Task[];

  @Input() step: Step;

  stepsCreated: Step[] = [];

  private addStepMessage: string = "";

  showReordering: boolean = false;

  constructor(
    private tasksService: TaskService,
    private status: StatusService) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getTasks();
    this.setAddStepMessage();
  }

  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   * @author Thijs Zijdel
   */
  private getTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  /**
   * Add a new task to the tasks by validating the input and add it to the taskService
   *
   *        Task data:
   * @param {string} name
   * @param {string} imgLink
   * @param {string} mainDescription
   * @param {string} startTime
   * @param {string} endTime
   * @author Thijs Zijdel
   */
  protected add(name: string, imgLink: string, mainDescription: string, startTime: string, endTime:string): void {
    name = name.trim();
    if (!name || !imgLink || !mainDescription || !startTime || !endTime) { return; }

    let times: TaskTime[] = new Array;
    times.push(new TaskTime(startTime, endTime));

    this.tasksService.addTask
      ({name: name, imgLink: imgLink, mainDescription: mainDescription, steps: this.stepsCreated, taskTimes: times } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  /**
   * Method for removing a certain step out the array
   * Note: id's will be reassigned
   *
   * @param {number} stepIndex, the index of the step
   * @author Thijs Zijdel
   */
  protected removeStep(stepIndex: number):void{
    this.stepsCreated.splice(stepIndex, 1);
    this.assignIds();
  }

  /**
   * Method for adding a new step for the task
   * note: dummy step is pushed in the stepsCreated array
   * @author Thijs Zijdel
   */
  protected addStep():void {
    this.stepsCreated.push(new Step(this.stepsCreated.length + 1, "/path/to/img.jpg", ""));
    this.setAddStepMessage();
  }

  /**
   * Method for (re)assigning all the step id's
   * This is to ensure that there aren't any wrong id's when removing a step
   * @author Thijs Zijdel
   */
  private assignIds() {
    var index = 1;
    for (let step of this.stepsCreated){
      step.id = index;
      index++;
    }
    this.setAddStepMessage();
  }

  /**
   * Method for moving a step "up" in the array of stepsCreated
   * @param {Step} step, that needs to be up one.
   * @author Thijs Zijdel
   */
  protected up(step: Step):void {
    this.move(step, -1);
  }

  /**
   * Method for moving a step "down" in the array of stepsCreated
   * @param {Step} step, that needs to be down one.
   * @author Thijs Zijdel
   */
  protected down(step: Step):void {
    this.move(step, 1);
  }

  /**
   * Move an step in the stepsCreated array
   * @param element
   * @param delta
   * @author Thijs Zijdel
   */
  private move(element, delta):void {
    var steps = this.stepsCreated;
    //get the elements index
    var index = steps.indexOf(element);
    var newIndex = index + delta;

    //check if the element is at the top or bottom
    if (newIndex < 0  || newIndex == steps.length) return;

    //sort the indexes
    var indexes = [index, newIndex].sort();

    //Replace from lowest index, two elements, reverting the order
    steps.splice(indexes[0], 2, steps[indexes[1]], steps[indexes[0]]);

    //Re assign step id's
    this.assignIds();
  };

  /**
   * Method for setting the appropriate alert message when adding a new step.
   * This is based on the amount of steps already added.
   * @author Thijs Zijdel
   */
  private setAddStepMessage():void {
    let size = this.stepsCreated.length;

    //validate the size
    if (size <= 6) {
      this.addStepMessage = "Het is daarom aan te raden om meer stappen toe te voegen. ";
      return;
    } else if (size >= 6 && size <= 10 ) {
      this.addStepMessage = "Het is aan te raden om nog een aantal stappen toe te voegen. ";
      return;
    } else if (size >= 11 && size <= 12 ) {
      this.addStepMessage = "Het is niet aan te raden om meer stappen toe te voegen. ";
      return;
    } else {
      this.addStepMessage = "Meer stappen leidt tot nog meer verwarring. ";
      return;
    }
  }

  /**
   * Name validation form controls
   * @type {FormControl} + get the alert message
   */
  nameValidation = new FormControl('', [Validators.required]);
  getErrorMessage() {return this.nameValidation.hasError('required') ? 'Je moet deze taak een naam geven' : '';}


  timeValidation = new FormControl('', [Validators.required]);
  getErrorMessageTime() {return this.nameValidation.hasError('required') ? 'Voer een tijd in zoals bijv: 09:00' : '';}

}
