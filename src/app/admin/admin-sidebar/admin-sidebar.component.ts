import { Component, OnInit } from '@angular/core';
import {StatusService} from "../login/status.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private status: StatusService) { }

  ngOnInit() {
  }

  /**
   * Method for logging out of the application
   * By setting the logged in status to false
   * @author: Thijs Zijdel
   */
  logout(): void {
    this.status.changeLoggedInStatus(false);
  }

}
