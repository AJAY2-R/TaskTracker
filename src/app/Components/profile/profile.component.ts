import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/Models/model';
import { ApiService } from 'src/app/Services/api.service';
import { TokenService } from 'src/app/Services/token.service';
@Component({
  selector: 'app-profile',
  template: `
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            User Information
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text">
              <strong>User ID:</strong> {{ user.userId }} <br>
              <strong>Phone Number:</strong> {{ user.phoneNumber }} <br>
              <strong>Email:</strong> {{ user.email }} <br>
              <strong>Address:</strong> {{ user.address }} <br>
              <strong>Username:</strong> {{ user.username }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
styles: []
})
export class ProfileComponent implements OnInit {
  user: Partial<User> = { name: '', userId: 0, phoneNumber: 0, email: '', address: '' };
  userId!:number;
  constructor(private api:ApiService,private userService:TokenService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(userId=>{
      if(userId!=null)
        this.userId=userId;
    })
    this.api.findUser(this.userId).subscribe((res:User)=>this.user=res);
  }

}
