import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/Employee';
import {MessageService} from '../../services/message.service';
import {StatusService} from './status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  employees: Employee[];

  actualLoginStatus;

  constructor(private employeeService: EmployeeService,
              private messageService: MessageService,
              private status: StatusService) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   */
  ngOnInit() {
    this.getEmployees();
    this.getActualStatus();
  }

  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   */
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  login(userNameInput: string, userPassInput: string): void {
    for ( const checkEmployee of this.employees ) {
      if (checkEmployee.username === userNameInput && checkEmployee.password === userPassInput){
        this.employeeService.setLoggedInEmployee(checkEmployee);
        this.log('access granted for: ' + checkEmployee.id);

        this.getActualStatus();
        this.status.changeLoggedInStatus(true);
        this.getActualStatus();
        return;
      }
    }
    this.log('access NOT granted, wrong credentials');
    return;
  }

  /**
   * Log a TaskService message with the MessageService
   */
  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }

  private getActualStatus(): void {
    this.actualLoginStatus = this.status.getLoggedInStatus();

  }
}
