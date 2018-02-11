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

import { MessagesComponent } from './components/messages/messages.component';


import { AppRoutingModule } from './/app-routing.module';


import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-date.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskSearchComponent } from './components/task-search/task-search.component';

/**
 * Initialize the modules and application
 */
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CurrentTaskComponent,
    MessagesComponent,
    TopNavComponent,
    DashboardComponent,
    TaskSearchComponent
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
    )
  ],
  providers: [
    TaskService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
