import { Injectable } from '@angular/core';


import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';


import { Task } from '../models/Task';

import { MessageService } from './message.service';

import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TaskTime} from "../models/TaskTime";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {

  private tasksUrl = 'https://team5.amsta-hva.tk/api/task.php';  // URL to web api

  public editTask: Task;

  private currentTaskTime: TaskTime = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /**
   * get tasks from the server
   * @author Thijs Zijdel
   */
  getTasks(): Observable<Task[]> {
    const url = `${this.tasksUrl}?action=getAll`;
    return this.http.get<Task[]>(url)
      .pipe(
      tap(tasks => this.log(`fetched tasks`)),
      catchError(this.handleError('getTask', []))
      );
  }

  /**
   * get task by id.
   * @author Thijs Zijdel
   */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}?action=get&id=${id}`;

    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched Task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /**
   * Log a TaskService message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('TaskService: ' + message);
  }


  /**
   * Handle Http operation that failed.
   *
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @author Thijs Zijdel
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console

      this.log(`${operation} failed: ${error.message}`);

      // Prevent crashing the application
      return of(result as T);
    };
  }


  /**
   * update the task on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateTask(task: Task): Observable<any> {
    const url = `${this.tasksUrl}?action=edit`;

    return this.http.put(url, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /**
   * add a new task to the server
   * note: POST
   */
  addTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}?action=add`;

    return this.http.post<Task>(url, task, httpOptions).pipe(
      tap((task: Task) => this.log(`added task w/ id=${task.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /**
   * delete the task from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}?action=remove&id=${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /**
   * get tasks whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Task[]>(`api/tasks/?name=${term}`).pipe(
      tap(_ => this.log(`found tasks matching "${term}"`)),
      catchError(this.handleError<Task[]>('searchTasks', []))
    );
  }

  /**
   * set an task that is requested for editing
   * @param {Task} task
   * @author Thijs Zijdel
   */
  public setEditTask(task: Task): void{
    this.editTask = task;
  }

  /**
   * uploads a new image to the server
   * note: POST
   * @author René Kok
   */

  uploadImage(file, fileName: string, stepNumber: number, isTaskImg: boolean) {
    let promise = new Promise((resolve, reject) => {
      const url = `${this.tasksUrl}?action=uploadImage`;

      const formData: FormData = new FormData();
      formData.append('fileToUpload', file, fileName);

      this.http.post(url, formData, {
        reportProgress: true,
        observe: 'events'
      }).toPromise()
        .then(
        res => { // Success
          console.log("Succes uploading " + fileName);
          resolve();
        }
        );
    });
    return promise;
  }

  /**
   * Method for getting the current task time
   * @returns {TaskTime}
   */
  public getCurrentTaskTime(): TaskTime {
    return this.currentTaskTime;
  }
  /**
   * Method for setting the current task time
   * @returns {TaskTime}
   */
  public setCurrentTaskTime(taskTime: TaskTime): void{
    this.currentTaskTime = taskTime;
  }
}

