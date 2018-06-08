import { Injectable } from '@angular/core';
import {Resident} from "../models/Resident";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Activity} from "../models/Activity";
import {observable} from "rxjs/symbol/observable";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ResidentService {

  private residentUrl = 'https://team5.amsta-hva.tk/api/resident.php';  // URL to web api

  public infoActivity: Activity;

  public editResident: boolean = false;


  public residentLoggedIn = false;

  public loggedInResident: Resident;



  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /**
   * get Residents from the server
   * @author Thijs Zijdel
   */
  getResidents (): Observable<Resident[]> {
    const url = `${this.residentUrl}?action=getAll`;
    return this.http.get<Resident[]>(url)
      .pipe(
        tap(tasks => this.log(`fetched Resident`)),
        catchError(this.handleError('getResidents', []))
      );
  }

  /**
   * get Resident by id.
   * @author Thijs Zijdel
   */
  getResident(id: number): Observable<Resident> {
    const url = `${this.residentUrl}?action=get&id=${id}`;

    return this.http.get<Resident>(url).pipe(
      tap(_ => this.log(`fetched Resident id=${id}`)),
      catchError(this.handleError<Resident>(`getResident id=${id}`))
    );
  }



  getResidentActivities(resident: any): Activity[] {
    if (resident instanceof Resident) {
      return resident.activities;
    }
  }



  /**
   * Log a ResidentService message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('ResidentService: ' + message);
  }


  /**
   * Handle Http operation that failed.
   *
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @author Thijs Zijdel
   */

  private handleError<T> (operation = 'operation', result?: T) {
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
  updateResident (resident: Resident): Observable<any> {
    const url = `${this.residentUrl}?action=edit`;

    return this.http.put(url, resident, httpOptions).pipe(
      tap(_ => this.log(`updated Resident id=${resident.id}`)),
      catchError(this.handleError<any>('updateResident'))
    );
  }



  /**
   * add a new Resident to the server
   * note: POST
   * @author Thijs Zijdel
   */
  addResident (resident: Resident): Observable<Resident> {
    const url = `${this.residentUrl}?action=add`;

    return this.http.post<Resident>(url, resident, httpOptions).pipe(
      tap((resident: Resident) => this.log(`added Resident w/ id=${resident.id}`)),
      catchError(this.handleError<Resident>('addResident'))
    );
  }


  /**
   * delete the Resident from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteResident (resident: Resident | number): Observable<Resident> {
    const id = typeof resident === 'number' ? resident : resident.id;
    const url = `${this.residentUrl}?action=remove&id=${id}`;

    return this.http.delete<Resident>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Resident id=${id}`)),
      catchError(this.handleError<Resident>('deleteResident'))
    );
  }



  /**
   * Set an info activity
   * @param {Activity} activity
   */
  public setInfoActivity(activity: Activity):void{
    this.infoActivity = activity;
  }

  public infoActivityIsSet(): boolean{
    return this.infoActivity.name.length !== 0 || this.infoActivity.name.length !== null;
  }



  /**
   * Log in for residents
   * note: no validation necessary
   *
   * @param Resident
   * @author: Thijs Zijdel
   */
  login(resident: Resident): void {
    if (resident == null)
      this.logout();

    this.residentLoggedIn = true;
    this.loggedInResident = resident;
  }

  /**
   * Log out
   *
   * @author: Thijs Zijdel
   */
  logout(): void {
    this.residentLoggedIn = false;
    this.loggedInResident = null;
  }

}
