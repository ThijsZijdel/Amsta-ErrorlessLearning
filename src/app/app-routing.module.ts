import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Import the tasks component for route
 */
import { TasksComponent } from './components/tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentTaskComponent } from './components/current-task/current-task.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { ManageTaskComponent } from './admin/add-task/manage-task.component';
import { AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './admin/login/login.component';

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
  { path: 'admin/manage-task', component: ManageTaskComponent},
  { path: 'login', component: LoginComponent}
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
