import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import {forEach} from "@angular/router/src/utils/collection";

/**
 * Tasks component
 */
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
/**
 * Tasks class
 * implements Initialize (OnInit)
 */
export class TasksComponent implements OnInit {
  /**
   * Array of tasks
   */
  tasks: Task[];
  
  random = new Date().getTime();

  /**
   * Constructor that gets the
   * @param {TaskService} tasksService, connection to the tasks
   */
  constructor(private tasksService: TaskService) { }

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
}

