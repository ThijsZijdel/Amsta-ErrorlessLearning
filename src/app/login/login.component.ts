import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/Employee';
import {MessageService} from '../services/message.service';
import {StatusService} from './status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;

  employees: Employee[];

  constructor(private employeeService: EmployeeService,
              private messageService: MessageService,
              private data: StatusService) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getEmployees();
    this.data.actualStatus.subscribe(loggedInStatus => this.isLoggedIn = loggedInStatus);
  }

  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   */
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  login(userNameInput: string, userPassInput: string) {
    for ( const checkEmployee of this.employees ) {
      if (checkEmployee.username === userNameInput && checkEmployee.password === userPassInput){
        this.employeeService.setLoggedInEmployee(checkEmployee);
        this.log('access granted for: ' + checkEmployee.id);

        this.data.changeLoggedInStatus(true);
        return;
      }
    }
    this.log('access NOT granted, wrong credentials');
  }

  /**
   * Log a TaskService message with the MessageService
   */
  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }
}
