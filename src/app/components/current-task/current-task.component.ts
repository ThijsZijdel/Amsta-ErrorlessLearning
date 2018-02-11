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
   * Set current task based on the input
   * in html by: <input [(ngModel)]="task.name" placeholder="name"/>
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

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.taskService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }

  delete(task: Task): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();

    this.taskService.deleteTask(task).subscribe();
    this.goBack();
  }
}
