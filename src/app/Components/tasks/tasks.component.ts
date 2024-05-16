import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDetails, TaskEdit, TaskStatus } from 'src/app/Models/model';
import { ApiService } from 'src/app/Services/api.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:TaskDetails[]=[];
  status=TaskStatus;
  userId!:number;
  apiService =inject(ApiService)
  constructor( private api:ApiService,private userService:TokenService) { }


  ngOnInit(): void {
      this.userService.currentUser.subscribe((val)=>this.userId=val);
      this.fetchData();
  }
  
  showEditModal:boolean=false
  editTask!: TaskEdit;
  selectedTask:any;
  
  hideEditModal(hideModal:boolean){
    this.api.tasks().subscribe({
      next:(res:TaskDetails[])=>{
        this.tasks=res.filter(task=>task.creatorId === this.userId);
        console.log(this.tasks)
      },
      error:(err)=>{
        console.error(err)
      }
    })
    this.showEditModal=false;
  }
  
  onEdit(task: TaskEdit) {
    this.editTask=task;
    this.showEditModal=true;
  }

  onSelect(task:TaskDetails){
      this.selectedTask=task;
      this.modalStatus=true;
    
  }

  modalStatus:boolean=false
  closeModal(){
    this.modalStatus=false;
  }

  //Fetch data
  fetchData(){
    
    this.api.tasks().subscribe({
      next:(res:TaskDetails[])=>{
        this.tasks=res.filter(task=>task.creatorId === this.userId);
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

}
