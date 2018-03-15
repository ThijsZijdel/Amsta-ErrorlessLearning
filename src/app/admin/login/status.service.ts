import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {isBoolean} from "util";

@Injectable()
export class StatusService {

  public loggedInStatus = false;

  constructor() { }

  /**
   * Set the loggedInStatus
   *
   * @param {boolean} status
   * @author: Thijs Zijdel
   */
  changeLoggedInStatus(status: boolean) {
    this.loggedInStatus = status;
  }

  /**
   * Get the actual login status
   * @returns {boolean} state
   * @author: Thijs Zijdel
   */
  getLoggedInStatus() {
    return this.loggedInStatus;
  }
}
