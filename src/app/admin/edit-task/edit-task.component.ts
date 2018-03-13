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
    this.task = null;
    this.task = this.taskService.editTask;
  }





  /**
   * Save changes made to the current task
   * @author Thijs Zijdel
   */
  save(): void {
    this.taskService.updateTask(this.task).subscribe();
  }

  close(): void {
    this.taskService.setEditTask(null);
  }
  /**
   * Delete the current task
   * @param {Task} task (this)
   * @author Thijs Zijdel
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
   *
   * @author Thijs Zijdel
   */
  getTask(): void {
    // TODO: make edit task not const
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
