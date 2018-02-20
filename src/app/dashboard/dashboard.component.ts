import { Component, OnInit } from '@angular/core';
import {Task} from '../models/task';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }

  /**
   * Get 3 tasks from the taskService to display on the home screen
   * @author Thijs Zijdel
   */
  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks.slice(1, 4));
  }

  /**
   * On initialize get those tasks.
   */
  ngOnInit() {
    this.getTasks();
  }

}
