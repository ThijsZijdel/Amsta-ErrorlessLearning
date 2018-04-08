import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/Employee';
import {MessageService} from '../../services/message.service';
import {StatusService} from './status.service';
import { Router } from '@angular/router';

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
              private status: StatusService,
              private router: Router) { }

  /**
   * Called on initialize
   * call getTasks to assign the setup the tasks array
   * @author: Thijs Zijdel
   */
  ngOnInit() {
    this.getEmployees();
    this.getActualStatus();
  }

  /**
   * Called by ngOnInit
   * get from the constructors task connection (service) the tasks
   * and add (subscribe) each task to the tasks array
   * @author: Thijs Zijdel
   */
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  /**
   * Login for the employee with validation of th3
   * @param {string} userNameInput
   * @param {string} userPassInput
   * @author: Thijs Zijdel
   */
  login(userNameInput: string, userPassInput: string): void {
    //check the inputted values on every employee
    for ( const checkEmployee of this.employees ) {
      //if the fields match: login
      if (checkEmployee.username === userNameInput && checkEmployee.password === userPassInput){
        this.employeeService.setLoggedInEmployee(checkEmployee);
        this.log('access granted for: ' + checkEmployee.id);

        this.status.changeLoggedInStatus(true);

        //Get the login status for showing the welcome message and links
        this.getActualStatus();
        this.router.navigate(['/admin']);
        return;
      }
    }
    this.log('access NOT granted, wrong credentials');
    return;
  }

  /**
   * Log a TaskService message with the MessageService
   * @author: Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }

  /**
   * Get the actual login status
   * @author: Thijs Zijdel
   */
  private getActualStatus(): void {
    this.actualLoginStatus = this.status.getLoggedInStatus();

  }
}
