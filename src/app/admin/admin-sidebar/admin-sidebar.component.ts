import { Component, OnInit } from '@angular/core';
import {StatusService} from "../login/status.service";
import {Router} from "@angular/router";
import {AdminDashboardComponent} from "../admin-dashboard/admin-dashboard.component";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private status: StatusService, private dashboard: AdminDashboardComponent) { }

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

  showPanel(name) {
    this.dashboard.setPanel(name);
  }

}
