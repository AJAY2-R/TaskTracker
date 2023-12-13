import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { TaskEdit,TaskDetails,TaskStatus  } from 'src/app/Models/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
  tasks:TaskDetails[]=[];
  status=TaskStatus;

  constructor(private api:ApiService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.api.userTasks().subscribe({
      
      next:(res:TaskDetails[])=>{
        this.tasks=res;
        //console.log(this.tasks)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  selectedTask:any;
  onStart(task:TaskDetails){
      this.selectedTask=task;
      this.modalStatus=true;
    
  }
 
  modalStatus:boolean=false
  closeModal(){
    this.fetchData();
    this.modalStatus=false;
  }

  onDragStart(task:TaskDetails){
    this.selectedTask=task
  }
  onDrop(event:any,status:string){
    const orginalStatus=this.selectedTask.status;

    const dragTask=this.tasks.find(task=>task.taskId==this.selectedTask.taskId)
    if(dragTask!=undefined){
    dragTask.status=status
    }
    this.api.taskStatusUpdate(this.selectedTask.taskId,status).subscribe({
      next:()=>{
          this.toastr.success("Status updated successfully");
      },
      error:()=>{
        console.log('error')
        if(dragTask!=undefined){

          dragTask.status=orginalStatus
          this.toastr.error("There is an error occured during status update ")
          }
      }
    })
  }

  onDragOver(event:any){
    event.preventDefault();
  }
 
}
