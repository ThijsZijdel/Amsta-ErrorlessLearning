import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Import the tasks component for route
 */
import { TasksComponent } from './components/tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentTaskComponent } from './admin/current-task/current-task.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddTaskComponent } from './admin/add-task/add-task.component';
import { EditTaskComponent } from './admin/edit-task/edit-task.component';
import { AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';

/**
 * Declaration of the routes (array)
 * @type path: url   component: link to component
 * @author Thijs Zijdel
 */
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'current/:id', component: CurrentTaskComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'console', component: MessagesComponent},
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/add-task', component: AddTaskComponent},
  { path: 'admin/edit-task', component: EditTaskComponent}
];

/**
 * module setup
 * @export this module
 * note: don't declare components in the routing module
 * @author Thijs Zijdel
 */
@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // listener for browser url changes
  exports: [ RouterModule ] // router directives available for appModule components
})
export class AppRoutingModule {}
