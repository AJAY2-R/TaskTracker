import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskEdit, User } from 'src/app/Models/model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  editForm!: FormGroup;
  users!: User[];
  selectedUser!: User | undefined; 
  originalData!: TaskEdit;

  @Input() task!: TaskEdit;
  @Output() showEditForm = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private api: ApiService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      assigneeId: ['', Validators.required],
    });

    if (this.task) {
      this.originalData={...this.task}
      this.editForm.patchValue({
        id: this.task.taskId,
        title: this.task.title,
        description: this.task.description,
        assigneeId: this.task.assigneeUsername,
      });
    }
  }

  submit: boolean = false; //form submit check

  //submmit form
  onSubmit() {
    this.submit = true;
    if(this.editForm.valid){
      const newData = this.createDataObject();
      this.api.updateTask(newData).subscribe(()=>{
        this.toastr.success("Updated successfully");
      });
      setTimeout(()=>{
        this.showEditForm.emit(false);
      },500)
    }
  }

  //hide the modal
  onCancel() {
    this.showEditForm.emit(false);
  }

  //search user 
  searchUser() {
    let keyword: string = this.editForm.get('assigneeId')?.value;
    this.api.searchUser(keyword).subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  
  // function to check if assignee is modified
  private isAssigneeModified(): boolean {
    return this.editForm.get('assigneeId')?.value !== this.originalData.assigneeUsername;
  }

  // function to find user by username in the users array
  private findUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

   // function to create a new data object
   private createDataObject(): any {
    // get the assigneeId based on whether the user selected a new user
    const assigneeId = this.isAssigneeModified()
      ? this.findUserByUsername(this.editForm.get('assigneeId')?.value)?.userId
      : this.task.assigneeId;
    return {
      taskId:this.task.taskId,
      title: this.editForm.get('title')?.value,
      description: this.editForm.get('description')?.value,
      assigneeId: assigneeId,
    };
  }
}
