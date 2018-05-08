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

  /**
   * On initialize set the current task to null (reset)
   * And get the actual editable task and assign this to the input.
   * @author: Thijs Zijdel
   */
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

  /**
   * Close the edit task view
   * @author: Thijs Zijdel
   */
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
    this.task = null;
    this.taskService.editTask = null;
    this.taskService.deleteTask(task).subscribe();
  }

}
