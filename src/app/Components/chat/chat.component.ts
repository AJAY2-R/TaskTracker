import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { SignalRService } from 'src/app/Services/signalr.service';
import { TokenService } from 'src/app/Services/token.service';
import {UserNotifications}  from 'src/app/Models/model';
@Component({
    selector: 'app-chat',
    template:` <div class="notification-dropdown ml-auto" ngbDropdown>
                    <button class="nav-link" id="notificationDropdown" ngbDropdownToggle>
                    <i class="fas fa-bell"></i> Notifications
                    </button>
                        <div class="dropdown-menu" aria-labelledby="notificationDropdown" ngbDropdownMenu>
                            <div class="dropdown-item notification-item"  *ngFor="let message of messages">
                            <div style="white-space: pre-line;">
                                <span *ngIf="message.content">{{ message.content.split(':').join(':\n') }}</span>
                            </div>
                            <div class="notification-date">{{ message.createdAt | date: 'shortTime' }}</div>
                        </div>
                        </div>
                </div>
            `,
})

export class ChatComponent implements OnInit {
  messages:UserNotifications[]=[];
    constructor(private signalRService: SignalRService,
        private toastr:ToastrService,
        private tokenService:TokenService,
        private api:ApiService) {}

    ngOnInit() {
        this.tokenService.loadCurrentUser();
        console.log(this.tokenService.currentUser.getValue())
        this.fetchMessage();
        this.signalRService.startConnection();
        this.signalRService.addMessageListener((message) => {
            console.log(`user: ${message}`);
            this.toastr.info(message,'',{
                enableHtml:true
            });
           this.fetchMessage();
        });
    }
    fetchMessage(){
        this.api.fetchNotifications().subscribe((val:UserNotifications[])=>{
            this.messages=val
      })
    }
}
