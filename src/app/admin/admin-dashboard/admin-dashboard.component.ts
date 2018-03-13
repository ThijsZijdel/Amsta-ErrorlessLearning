import { Component, OnInit } from '@angular/core';
import {StatusService} from "../login/status.service";
import {Task} from '../../models/Task';
import {EditTaskComponent} from "../edit-task/edit-task.component";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loginStatusActual;

  /**
   * Array of tasks
   */
  tasks: Task[];

  constructor(private status: StatusService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.loginStatusActual = this.status.getLoggedInStatus();
    this.getTasks();
  }

  setPanel(name: string) {
    console.log("Setted: "+name);
  }

  editTask(task: Task) {
    this.taskService.setEditTask(task);
  }


  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   * @author Thijs Zijdel
   */
  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
