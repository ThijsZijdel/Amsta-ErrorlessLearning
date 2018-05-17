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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/**
 * Imports for data services
 */
import { TaskService } from './services/task.service';
import { MessageService } from './services/message.service';
import { EmployeeService } from './services/employee.service';
import { StatusService } from './admin/login/status.service';

import { MessagesComponent } from './admin/messages/messages.component';


import { AppRoutingModule } from './/app-routing.module';

/**
 * Material design modules and components
 **/
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskSearchComponent } from './components/task-search/task-search.component';
import { ManageTaskComponent } from './admin/add-task/manage-task.component';


import { LoginComponent } from './admin/login/login.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';

import {
   MatFormFieldModule, MatInputModule, MatSlideToggleModule,
  MatTooltipModule
} from "@angular/material";
import {ResidentService} from "./services/resident.service";
import { ResidentComponent } from './admin/resident/resident.component';
import { LoginResidentComponent } from './admin/login-resident/login-resident.component';




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
    ManageTaskComponent,
    LoginComponent,
    SelectUserComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    ResidentComponent,
    LoginResidentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserAnimationsModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    TaskService,
    MessageService,
    EmployeeService,
    StatusService,
    ResidentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
