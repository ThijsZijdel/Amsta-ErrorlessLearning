import {Component, Input, OnInit} from '@angular/core';
import { Task } from '../../models/Task';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService} from '../../services/task.service';

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

  /**
   * Set current task based on the routers constructor
   * *ngIf="task"
   */
  @Input() task: Task;

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
              private location: Location) {
  }

  /**
   * Called on initializing
   */
  ngOnInit() {
    this.getTask();
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
   */
  goBack(): void {
    this.location.back();
  }
}
