import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { HeaderComponent } from './Components/header/header.component';
import { ModalComponent } from './Components/modal/modal.component';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';
import { ChatComponent } from './Components/chat/chat.component';
import { UserTasksComponent } from './Components/user-tasks/user-tasks.component';
import { TaskDetailsComponent } from './Components/task-details/task-details.component';
import { ProfileComponent } from './Components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddTaskComponent,
    TasksComponent,
    HeaderComponent,
    ModalComponent,
    TaskEditComponent,
    ChatComponent,
    UserTasksComponent,
    TaskDetailsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
