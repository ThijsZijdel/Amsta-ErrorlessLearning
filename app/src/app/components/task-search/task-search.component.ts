import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Task} from '../../models/Task';
import { TaskService} from '../../services/task.service';


@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  visible;

  tasks$: Observable<Task[]>;
  private searchTerms = new Subject<string>();

  constructor(private taskService: TaskService) {}

  /**
   * Push a search term into the observable stream.
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Initialize the search pipe.
   *
   * @Author Angular
   */
  ngOnInit(): void {
    this.tasks$ = this.searchTerms.pipe(
      // wait 1ms after each keystroke before considering the term
      debounceTime(1),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.taskService.searchTasks(term)),
    );
  }
}
