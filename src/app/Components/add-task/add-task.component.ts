import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/model';
import { UserTask } from 'src/app/Models/model';
import { ApiService } from 'src/app/Services/api.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm!:FormGroup;
  users:User[]=[];
  
  constructor(private fb:FormBuilder,private api:ApiService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.taskForm=this.fb.group({
      title:['',Validators.required],
      description: ['', Validators.required],
      assigneeId:['',Validators.required],
    })
  }
  
  //search user
  searchUser(){
    let keyword:string=this.taskForm.get('assigneeId')?.value
    this.api.searchUser(keyword).subscribe({
      next:(res:User[])=>{
          this.users=res;
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  //Find id of the user
  findId() {
   const username=this.taskForm.get('assigneeId')?.value
   if(username)
    return this.users.find(user=> user.username == username)?.userId;
   else
    return 0;
  }

  submit:boolean=false
  onSubmit(){
    this.submit=true
    if(this.taskForm.valid){
      this.api.addTask(this.mapToTask()).subscribe({
        next:()=>{
          this.toastr.success("Task added successfully")
          this.router.navigate(['/Home'])
        },
        error:(err)=>{
          console.log(err)
          this.toastr.error("There is an error occured while processing your request")
        }
      })
    }
  }
  //map from data to object
  mapToTask(): UserTask {
    const data = this.taskForm.value;
    const id=this.findId();
    return {
      title: data.title,
      description: data.description,
      assigneeId: id || 0 , 
      creatorId: data.creatorId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}
