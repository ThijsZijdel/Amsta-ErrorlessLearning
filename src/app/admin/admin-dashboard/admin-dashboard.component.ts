import { Component, OnInit } from '@angular/core';
import {StatusService} from "../login/status.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {observable} from "rxjs/symbol/observable";

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
