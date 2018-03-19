import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {Step} from '../../models/Step';
declare var $ :any;

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

  sampleStep: Step = {id: 1, stepImgLink: '/path/to/img.jpg', stepDescription: ''};
  stepsCreated: Step[] = [this.sampleStep];

  private addStepMessage: string = "";

  constructor(
    private tasksService: TaskService) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getTasks();
    this.getSteps();
    this.setAddStepMessage();
  }

  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   * @author Thijs Zijdel
   */
  getTasks(): void {
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
    if (!name || !imgLink || !mainDescription) { return; }

    this.tasksService.addTask
      ({name: name, imgLink: imgLink, mainDescription: mainDescription, steps: this.stepsCreated } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  private getSteps() {

    //  new Step({ id:2, link:"link", desc: "desc"})

  }

  protected removeStep(stepIndex: number){
    this.stepsCreated.splice(stepIndex, 1);
    this.AssignIds();
  }

  protected addStep() {
    this.stepsCreated.push(new Step(this.stepsCreated.length + 1, "/path/to/img.jpg", ""));
    this.setAddStepMessage();
  }

  private AssignIds() {
    var index = 1;
    for (let step of this.stepsCreated){
      step.id = index;
      index++;
    }
    this.setAddStepMessage();
  }

  protected up(step: Step) {
    this.move(step, -1);
  }

  protected down(step: Step) {
    this.move(step, 1);
  }

  /**
   * Move an step in the stepsCreated array
   * @param element
   * @param delta
   */
  private move(element, delta) {
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
    this.AssignIds();
  };


  private setAddStepMessage() {
    let size = this.stepsCreated.length;

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
}
