import { Component, OnInit } from '@angular/core';
import { StatusService } from "../login/status.service";
import { Task } from '../../models/Task';
import { TaskService } from "../../services/task.service";
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../models/Resident";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  protected loginStatusActual;

  /**
   * Array of tasks
   */
  protected tasks: Task[];

  protected residents: Resident[];

  constructor(private status: StatusService,
              private taskService: TaskService,
              private residentService: ResidentService) { }

  /**
   * on initialize the current login status will be get
   * @author: Thijs Zijdel
   */
  ngOnInit() {
    this.loginStatusActual = this.status.getLoggedInStatus();
    this.getTasks();
    this.getResidents();
  }

  /**
   * Called on click button, for setting the editable task
   * @param {Task} task
   * @author: Thijs Zijdel
   */
  protected editTask(task: Task): void {
    this.taskService.setEditTask(task);
  }

  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   * @author Thijs Zijdel
   */
  private getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }


  /**
   * Get al the residents for the resident manager
   * @author Thijs Zijdel
   */
  private getResidents(): void {
    this.residentService.getResidents().subscribe(residents => this.residents = residents);
  }

  /**
   * Set the editable resident
   * @author Thijs Zijdel
   */
  protected editableResident():void  {
    this.residentService.editResident = true;
  }
}
