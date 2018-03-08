import { Component, OnInit } from '@angular/core';
import {StatusService} from "../login/status.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loginStatusActual;
  constructor(private status: StatusService) { }

  ngOnInit() {
    this.loginStatusActual = this.status.getLoggedInStatus();
  }

}
