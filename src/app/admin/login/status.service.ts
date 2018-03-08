import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService {

  private loggedInStatus = new BehaviorSubject<boolean>(false);
  actualStatus = this.loggedInStatus.asObservable();

  constructor() { }

  changeLoggedInStatus(status: boolean) {
    this.loggedInStatus.next(status);
  }

  getLoggedInStatus() {
    return this.loggedInStatus;
  }
}
