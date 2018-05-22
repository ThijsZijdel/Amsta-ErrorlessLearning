import { Component, OnInit } from '@angular/core';
import { StatusService} from '../../admin/login/status.service';
import {observable} from "rxjs/symbol/observable";
import {ResidentService} from "../../services/resident.service";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
/**
 * Nav bar component class
 */
export class TopNavComponent implements OnInit {

  isValid = false;

  constructor(private statusService: StatusService,
              public residentService: ResidentService,
              public employeeService: EmployeeService) { }

  ngOnInit() {
  }

}
