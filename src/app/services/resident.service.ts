import { Injectable } from '@angular/core';
import {Resident} from "../models/Resident";

@Injectable()
export class ResidentService {

  public residentLoggedIn = false;

  public loggedInResident: Resident;

  public residents: Resident[];

  constructor() { }

  /**
   * Log in
   *
   * @param Resident
   * @author: Thijs Zijdel
   */
  login(resident: Resident) {
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
  logout() {
    this.residentLoggedIn = false;
    this.loggedInResident = null;
  }

}
