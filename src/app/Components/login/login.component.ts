import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { Login } from 'src/app/Models/model';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submited:boolean=false;
  constructor(private fb:FormBuilder,private router:Router,private api:ApiService,private toastr:ToastrService) { }
  loginForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  ngOnInit(): void {
  }
  onSubmit(){
    this.submited=true;
    if(this.loginForm.valid){
      this.api.loginUser(this.loginForm.value as Login ).subscribe({
        next:(res:any)=>{
          this.router.navigate(['Home'])
        },
        error:(res:any)=>{
          console.log(res)
          this.toastr.error("Invalid creaditaials",'',{
            positionClass:'toast-top-center'
          },
          
        )
        }
    })
    }
  }

}
