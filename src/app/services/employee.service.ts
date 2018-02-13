import { Injectable } from '@angular/core';

import { Employee } from '../models/Employee';

import { MessageService } from './message.service';

import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class EmployeeService {

  /**
   * Current logged in employee
   */
  private loggedInEmployee: Employee;

  private employeesUrl = 'api/employees';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /**
   * GET Employee from the server
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(heroes => this.log(`fetched Employee`)),
        catchError(this.handleError('getEmployee', []))
      );
  }

  /**
   * GET Employee by id.
   *
   * Will 404 if id not found
   */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  /**
   * Log a EmployeeService message with the MessageService
   */
  private log(message: string) {
    this.messageService.add('EmployeeService: ' + message);
  }


  /**
   * Handle Http operation that failed.
   *
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setLoggedInEmployee(employee: Employee) {
      this.loggedInEmployee = employee;
  }

}
