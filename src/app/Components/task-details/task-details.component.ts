import { Component, OnInit,Input, EventEmitter,Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskDetails,TaskStatus } from 'src/app/Models/model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-task-details',
  template: `<div class="overlay" (click)="closeModal()">
  <div class="cus-modal col-md-5">
    <div class="container">
      <div class="card p-3">
        <div class="row">
          <h2 class="text-center wheat">Task Details</h2>
        </div>
        <div class="row">
          <div class="col">
            <p><strong>Title:</strong> {{ task.title }}</p>
            <p><strong>Description:</strong> {{ task.description }}</p>
            <p><strong>Status:</strong> {{ task.status }}</p>
            <p><strong>Assignee:</strong> {{ task.assigneeName }}</p>
            <p><strong>Created :</strong> {{ task.creatorName}}</p>
            <p><strong>Created date:</strong> {{task.createdAt}}</p>
            <p><strong> {{task.status == TaskStatus.InProgress ? "Started date'" : 
                        task.status == TaskStatus.Completed ? "Completed date": "Updated date "}} :</strong> {{task.updatedAt}}</p>
          </div>
        </div>
        <div class="row" >
          <div *ngIf="show">
            <button class="btn wheat" (click)="onStart()" *ngIf="task.status == TaskStatus.Assigned">Start</button>
            <button class="btn wheat" (click)="onComplete()" *ngIf="task.status == TaskStatus.InProgress">Mark as done</button>
          </div>
          <button class="btn " (click)="closeModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>`
})
export class TaskDetailsComponent implements OnInit {

  @Input() task!:TaskDetails;
  @Input() show:boolean =true;
  @Output() closeModalEvent = new EventEmitter<void>();
  constructor(private api:ApiService,private toastr:ToastrService) { }
  TaskStatus=TaskStatus;

  ngOnInit(): void {
  }
  closeModal():void{
    this.closeModalEvent.emit();
  }
  onStart(){
       this.api.taskAccept(this.task.taskId).subscribe({
        next:()=>{
        this.toastr.success("Status updated")
       },
            error:()=>{
              this.toastr.error("Faild to update status")
        }
      });
      setTimeout(()=>{
        this.closeModal();
      },500)
      
  }
  onComplete(){
    this.api.taskCompleted(this.task.taskId).subscribe(()=>console.log("Finised"));
    this.closeModal();
}
}
