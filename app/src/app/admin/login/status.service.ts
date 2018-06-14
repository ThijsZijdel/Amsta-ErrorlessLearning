import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {isBoolean} from "util";

@Injectable()
export class StatusService {

  public loggedInStatus:boolean = false;

  constructor() { }

  /**
   * Set the loggedInStatus
   *
   * @param {boolean} status
   * @author: Thijs Zijdel
   */
  public changeLoggedInStatus(status: boolean):void {
    this.loggedInStatus = status;
  }

  /**
   * Get the actual login status
   * @returns {boolean} state
   * @author: Thijs Zijdel
   */
  public getLoggedInStatus(): boolean {
    return this.loggedInStatus;
  }
}
