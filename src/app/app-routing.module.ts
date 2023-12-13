import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';
import { ChatComponent } from './Components/chat/chat.component';
import { UserTasksComponent } from './Components/user-tasks/user-tasks.component';
import { AuthGuard } from './core/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {
    path: 'Home',
    component: TasksComponent,
    canActivate:[AuthGuard]
  },
  
  {
    path: 'Login',
    component: LoginComponent,
    
  },
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'AddTask',
    component: AddTaskComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'Tasks',
    component: TasksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'Profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  {
    path: 'MyTasks',
    component: UserTasksComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
