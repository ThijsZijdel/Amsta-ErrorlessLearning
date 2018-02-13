import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/Task';
import {TaskService} from '../../services/task.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTask();
  }




  /**
   * Save changes made to the current task
   */
  save(): void {
    this.taskService.updateTask(this.task).subscribe();
  }

  /**
   * Delete the current task
   * @param {Task} task (this)
   */
  delete(task: Task): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();

    this.taskService.deleteTask(task).subscribe();
  }

  /**
   * Getter for the current task
   * note:  this will be setted to @input() task
   *        and used in *ngIf="task"
   */
  getTask(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    const id = 1;
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  // /**
  //  * Back button
  //  */
  // goBack(): void {
  //   this.location.back();
  // }

}
