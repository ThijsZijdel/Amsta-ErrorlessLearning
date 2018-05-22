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
  public loggedInEmployee: Employee;

  private employeesUrl = 'api/employees';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /**
   * GET Employees from the server
   * @author Thijs Zijdel
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(employees => this.log(`loaded Employese`)),
        catchError(this.handleError('getEmployee', []))
      );
  }

  /**
   * GET Employee by id.
   * @author Thijs Zijdel
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
   * @author Thijs Zijdel
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
   * @author Thijs Zijdel
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Prevent crashing
      return of(result as T);
    };
  }

  /**
   * Set the current logged in employee
   * @param {Employee} employee
   * @author Thijs Zijdel
   */
  setLoggedInEmployee(employee: Employee) {
      this.loggedInEmployee = employee;
  }


}
