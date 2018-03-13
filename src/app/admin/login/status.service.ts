import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {isBoolean} from "util";

@Injectable()
export class StatusService {

  public loggedInStatus = false;

  constructor() { }

  changeLoggedInStatus(status: boolean) {
    this.loggedInStatus = status;
  }

  getLoggedInStatus() {
    return this.loggedInStatus;
  }
}
