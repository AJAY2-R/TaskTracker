export interface User{
    userId:number,
    name:string,
    phoneNumber:number,
    email:string,
    address:string,
    username:string,
    password:string
}

export interface UserDetails{
    userId:number,
    name:string,
    phoneNumber:number,
    email:string,
    address:string,
    username:string,
}
export interface Login{
    username:string,
    password:string
}

export interface UserTask{
    taskId?:number,
    title:string,
    description:string,
    assigneeId:number,
    creatorId:number,
    createdAt:Date,
    updatedAt:Date
}
export interface TaskDetails {
    taskId: number;
    title: string;
    status:string,
    description: string;
    assigneeId: number;
    assigneeName: string;
    assigneeUsername:string,
    creatorId: number;
    creatorName: string;
    createdAt: Date;
    updatedAt: Date;
  }
 export  enum TaskStatus {
    Assigned = "Assigned",
    InProgress = "InProgress",
    Completed = "Completed",
  }
  
  export interface TaskEdit{
    taskId :number,
    title:string,
    description:string,
    assigneeId: any;
    assigneeUsername:string,
  }
  export interface UserNotifications{
    notificationId:number,
    userId:number,
    content:string,
    createdAt:Date
  }