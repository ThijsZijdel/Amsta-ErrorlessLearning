import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';

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

    this.tasksService.addTask({ name, imgLink, mainDescription, steps  } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

}
