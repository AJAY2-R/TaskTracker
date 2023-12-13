import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <h1 class="navbar-brand mb-0 h1">Task Tracker</h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <ng-container *ngIf="isLoggedIn;else notAuth">
        <li class="nav-item active">
          <a class="nav-link" routerLink="/Home"><i class="fas fa-home"></i> Home </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/MyTasks"><i class="fas fa-tasks"></i> My Tasks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/AddTask"><i class="fas fa-plus"></i> Add Task</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/Profile"><i class="fas fa-user"></i> Profile</a>
        </li>
        <li class="nav-item">
          <app-chat></app-chat>
        </li>
        <li class="nav-item">
          <button class="nav-link" (click)="logout()"><i class="fas fa-sign-out"></i>Logout</button>
        </li>
        </ng-container >
        <ng-template #notAuth>
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Register">Register</a>
          </li>
        </ng-template>
      </ul>
    </div>
  </div>
</nav>

  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit,OnDestroy {
  isLoggedIn:boolean=false;
  private authSubscription!: Subscription;

  constructor(private auth:TokenService) { }

  ngOnInit(): void {
      this.authSubscription = this.auth.isLoggedin.subscribe((status)=>{
        this.isLoggedIn=status;
      })
  }

  logout(){
    this.auth.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
