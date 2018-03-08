import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {isBoolean} from "util";

@Injectable()
export class StatusService {

  public loggedInStatus = false;
  //actualStatus = this.loggedInStatus.get();

  constructor() { }

  changeLoggedInStatus(status: boolean) {
    console.log(this.loggedInStatus+"< before");
    this.loggedInStatus= status;
    console.log(this.loggedInStatus+"< after")
  }

  getLoggedInStatus() {

    console.log(this.loggedInStatus +" returend status");
    return this.loggedInStatus;
  }
}
