import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/model';
import { ApiService } from 'src/app/Services/api.service';
import { passwordStrength } from 'src/app/core/passwordStrength';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   registerForm!:FormGroup;
  constructor(private fb :FormBuilder,private api:ApiService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
      this.registerForm= this.fb.group({
        name:['',Validators.required],
        phoneNumber:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        address:['',Validators.required],
        username:['',Validators.required],
        password:['',[Validators.required,passwordStrength()]]  
          })
  }

  confirmPassword:string='';
  paswordMatch:boolean=false;
  fromSubmit:boolean=false;
  checkPassword(password:string){
    this.confirmPassword=password
    if(password !== this.registerForm.get('password')?.value)
      this.paswordMatch = true
    else
      this.paswordMatch = false
  }

  //Register
  onSubmit(){
    this.fromSubmit=true;
    this.checkPassword(this.confirmPassword)
    if(this.registerForm.valid && !this.paswordMatch){
      this.api.registerUser(this.registerForm.value as User).subscribe(()=>{
        this.toastr.success("Registed successfully");
        this.router.navigate(['/Login']);
      }),
      ()=>{
        this.toastr.error("Can't register at the movement try again later");
      }
    }
  }
}
