import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { Step } from '../../models/Step';
import { StatusService } from "../login/status.service";
import { TaskTime } from "../../models/TaskTime";

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {

  /**
   * The tasks from taskService
   */
  protected tasks: Task[];

  /**
   * Tasks attributes
   */
  taskNameValue: string;
  imgLink: string;
  mainDescription: string;

  //Step variables
  @Input() step: Step;
  protected stepsCreated: Step[] = [];
  protected addStepMessage: string = "";
  protected showReordering: boolean = false;

  //Task times
  taskTimes: TaskTime[] = [];

  //Uploading Image
  selectedFile: File;
  uploading = false;

  /**
   * Potential editable task
   */
  protected editTask: Task = null;


  protected AdminDoingMessage: string = "Een extra stappenplan toevoegen.";

  constructor(private tasksService: TaskService,
    private status: StatusService) {
  }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getTasks();
    this.setAddStepMessage();

    //check if an tasks needs to be edited
    this.checkForEdit();
  }

  /**
   * Close this view and remove the editing task
   * @author: Thijs Zijdel
   */
  close(): void {
    this.tasksService.setEditTask(null);
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
   * @author Thijs Zijdel
   */
  protected add(name: string, imgLink: string, mainDescription: string): void {
    name = name.trim();
    if (!name || !imgLink || !mainDescription) {
      return;
    }

    this.tasksService.addTask
      ({
        name: name,
        imgLink: imgLink,
        mainDescription: mainDescription,
        steps: this.stepsCreated,
        taskTimes: this.taskTimes
      } as Task)
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
  protected removeStep(stepIndex: number): void {
    this.stepsCreated.splice(stepIndex, 1);
    this.assignIds();
  }

  /**
   * Method for adding a new step for the task
   * note: dummy step is pushed in the stepsCreated array
   * @author Thijs Zijdel
   */
  protected addStep(): void {
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
    for (let step of this.stepsCreated) {
      step.id = index;
      index++;
    }
    var taskTimesIndex = 1;
    for (let time of this.taskTimes) {
      time.id = taskTimesIndex;
      taskTimesIndex++;
    }
    this.setAddStepMessage();
  }

  /**
   * Method for moving a step "up" in the array of stepsCreated
   * @param {Step} step, that needs to be up one.
   * @author Thijs Zijdel
   */
  protected up(step: Step): void {
    this.move(step, -1);
  }

  /**
   * Method for moving a step "down" in the array of stepsCreated
   * @param {Step} step, that needs to be down one.
   * @author Thijs Zijdel
   */
  protected down(step: Step): void {
    this.move(step, 1);
  }

  /**
   * Move an step in the stepsCreated array
   * @param element
   * @param delta
   * @author Thijs Zijdel
   */
  private move(element, delta): void {
    var steps = this.stepsCreated;
    //get the elements index
    var index = steps.indexOf(element);
    var newIndex = index + delta;

    //check if the element is at the top or bottom
    if (newIndex < 0 || newIndex == steps.length) return;

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
  private setAddStepMessage(): void {
    let size = this.stepsCreated.length;

    //validate the size
    if (size <= 6) {
      this.addStepMessage = "Het is daarom aan te raden om meer stappen toe te voegen. ";
      return;
    } else if (size >= 6 && size <= 10) {
      this.addStepMessage = "Het is aan te raden om nog een aantal stappen toe te voegen. ";
      return;
    } else if (size >= 11 && size <= 12) {
      this.addStepMessage = "Het is niet aan te raden om meer stappen toe te voegen. ";
      return;
    } else {
      this.addStepMessage = "Meer stappen leidt tot nog meer verwarring. ";
      return;
    }
  }

  addTime() {
    this.taskTimes.push(new TaskTime("10:00", "11:00"));
  }

  removeTime(time: TaskTime) {
    this.taskTimes.splice(this.taskTimes.indexOf(time), 1);
  }


  /**
   * Check if there is an task that needs to be editted.
   * If this is true, setup all the fields
   * @author Thijs Zijdel
   */
  private checkForEdit() {
    //get an potential edit task.
    this.editTask = this.tasksService.editTask;


    if (this.editTask != null) {
      this.taskNameValue = this.editTask.name;
      this.imgLink = this.editTask.imgLink;
      this.mainDescription = this.editTask.mainDescription;
      this.taskTimes = this.editTask.taskTimes;
      this.stepsCreated = this.editTask.steps;

      this.AdminDoingMessage = "Een taak aanpassen."
    } else {
      //setup a empty dummy time
      this.taskTimes.push(new TaskTime("09:00", "10:00"));
    }
  }

  /**
   * Save changes made to the current task
   * @author Thijs Zijdel
   */
  protected saveEditingTask(name: string, imgLink: string, mainDescription: string): void {

    this.getUpdatedFields();

    this.editTask.name = name;
    this.editTask.imgLink = imgLink;
    this.editTask.mainDescription = mainDescription;

    this.editTask.taskTimes = this.taskTimes;
    this.editTask.steps = this.stepsCreated;

    this.assignIds();

    this.tasksService.updateTask(this.editTask).subscribe();

    console.log("Saved to DB")
  }

  private getUpdatedFields() {
    // this.taskNameValue = $scope.taskname;
  }

  /**
   * Delete the current edit task
   * @param {Task} task (this)
   * @author Thijs Zijdel
   */
  protected deleteEditingTask(task: Task): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();
    this.editTask = null;
    this.tasksService.editTask = null;
    this.tasksService.deleteTask(task).subscribe();
  }

  updateThisTime(isStartTime: boolean, index: number, value: string) {

    console.log("is an start:" + isStartTime + "  -> index:" + index + "  -> value" + value)
    console.log("taskTimes[index].startTime   =>  " + this.taskTimes[index].startTime)
    console.log("taskTimes[index].endTime   =>  " + this.taskTimes[index].endTime)

    if (isStartTime)
      this.taskTimes[index].startTime = value;
    else
      this.taskTimes[index].endTime = value;

    console.log("----------------------------------------------")
    console.log("is an start:" + isStartTime + "  -> index:" + index + "  -> value" + value)
    console.log("taskTimes[index].startTime   =>  " + this.taskTimes[index].startTime)
    console.log("taskTimes[index].endTime   =>  " + this.taskTimes[index].endTime)
  }



  /**
   * Checks if there's any file pending to upload
   * @author René Kok
   */
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  /**
   * Upload image to server and set names to right path
   * @author René Kok
   */
  onUploadImgLink(stepNumber: number, isTaskImg: boolean) {
    this.uploading = true;
    var fileName = this.setFileName(stepNumber, isTaskImg);

    if (isTaskImg) {
      this.imgLink = "bezig met uploaden"
      this.editTask.imgLink = "bezig met uploaden";
      console.log("Set fileurl to " + this.editTask.imgLink)
    } else {
      this.editTask.steps[stepNumber].stepImgLink = "bezig met uploading";
      this.stepsCreated[stepNumber].stepImgLink = "bezig met uploading";
    }

    this.imgLink = "uploading"
    this.editTask.imgLink = "uploading";

    this.tasksService.uploadImage(this.selectedFile, fileName, stepNumber, isTaskImg)
      .then(() => this.updateImgPath(isTaskImg, fileName, stepNumber)).then(() => this.uploading = false);
  }

  /**
   * Generates a new filename based
   * @author René Kok
   */
  private setFileName(stepNumber: number, isTaskImg: boolean): string {
    if (isTaskImg) {
      return this.editTask.name + "_" + stepNumber + ".jpg"
    } else {
      return this.editTask.name + "_" + (stepNumber + 1) + ".jpg"
    }
  }

  /**
   * Updates the path for the images
   * @author René Kok
   */
  updateImgPath(isTaskImg: boolean, fileName: string, stepNumber: number) {
    var fileLocation = "/tasks/"

    if (isTaskImg) {
      console.log("Set fileurl to " + this.editTask.imgLink)
      this.imgLink = fileLocation + fileName;
      this.editTask.imgLink = this.imgLink;
      console.log("Set fileurl to " + this.editTask.imgLink)
    } else {
      this.editTask.steps[stepNumber].stepImgLink = fileLocation + fileName;
      this.stepsCreated[stepNumber].stepImgLink = fileLocation + fileName;
      console.log("Set fileurl to " + this.editTask.steps[stepNumber].stepImgLink + "(Step)")
    }
  }
}