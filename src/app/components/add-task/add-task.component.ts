import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {Step} from "../../models/Step";

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

  constructor(
    private tasksService: TaskService) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getTasks();
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

    const step1: Step = {id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 1'};
    const step2: Step = {id: 2, stepImgLink: 'link', stepDescription: 'name2'};

    const stepsCreated: Step[] = [step1, step2];

    this.tasksService.addTask({name: name, imgLink: imgLink, mainDescription: mainDescription, steps: stepsCreated } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

}
