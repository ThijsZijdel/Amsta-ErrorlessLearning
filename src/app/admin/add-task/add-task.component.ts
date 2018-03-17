import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {Step} from '../../models/Step';

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

  constructor(
    private tasksService: TaskService) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getTasks();
    this.getSteps();
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
   * @param {string} steps
   * @author Thijs Zijdel
   */
  add(name: string, imgLink: string, mainDescription: string, steps: string): void {
    name = name.trim();
    if (!name || !imgLink || !mainDescription) { return; } // note: steps not required, YET!




    this.tasksService.addTask
      ({name: name, imgLink: imgLink, mainDescription: mainDescription, steps: this.stepsCreated } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  private getSteps() {

    //  new Step({ id:2, link:"link", desc: "desc"})

  }

  removeStep(stepIndex: number){
    this.stepsCreated.splice(stepIndex, 1);
    this.AssignIds();
  }

  addStep() {
    this.stepsCreated.push(new Step(this.stepsCreated.length + 1, "/path/to/img.jpg", ""));
  }

  private AssignIds() {
    var index = 1;
    for (let step of this.stepsCreated){
      step.id = index;
      index++;
    }
  }
}
