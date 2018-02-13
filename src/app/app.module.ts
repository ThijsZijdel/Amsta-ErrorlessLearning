import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * Imports for the main components
 */
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CurrentTaskComponent } from './components/current-task/current-task.component';

/**
 * Imports for angular modules
 */
import { FormsModule } from '@angular/forms';


/**
 * Imports for data services
 */
import { TaskService } from './services/task.service';
import { MessageService } from './services/message.service';
import { EmployeeService } from './services/employee.service';
import { StatusService } from './login/status.service';

import { MessagesComponent } from './components/messages/messages.component';


import { AppRoutingModule } from './/app-routing.module';

/**
 * Material design modules and components
 **/
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-date.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskSearchComponent } from './components/task-search/task-search.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { LoginComponent } from './login/login.component';
import { SelectUserComponent } from './components/select-user/select-user.component';

/**
 * Initialize the modules and application
 * @author Thijs Zijdel -  configured the application for the start
 */
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CurrentTaskComponent,
    MessagesComponent,
    TopNavComponent,
    DashboardComponent,
    TaskSearchComponent,
    AddTaskComponent,
    EditTaskComponent,
    LoginComponent,
    SelectUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserAnimationsModule,
    MatStepperModule
  ],
  providers: [
    TaskService,
    MessageService,
    EmployeeService,
    StatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
