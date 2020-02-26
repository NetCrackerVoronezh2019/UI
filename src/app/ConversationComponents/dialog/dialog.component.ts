import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from './Services/dialog.Service'
import { ActivatedRoute, Router} from '@angular/router';
import { User } from '@ConversationClasses/User'
import { Dialog } from '@ConversationClasses/dialog'
import { Message } from '@ConversationClasses/message'
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';
import $ from 'jquery';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers:[DialogService]
})
export class DialogComponent implements OnInit {

  dialogId:string;
  access:boolean = false;
  addUserVisible:boolean = false;
  dialogMembers:User[] = [];
  messages:Message[] = [];
  private serverUrl = 'ws://localhost:8088/socket/websocket'
  private stompClient:Client;
  dialog:Dialog;
  user:User;
  textbox:string = "";

  constructor(public dgService:DialogService,private route: ActivatedRoute,private location: Router) {
    this.dgService.getUser().subscribe(
      (data:User) => {
        this.user=data;
      },
      error => console.log(error)
    );
  }

  initializeWebSocketConnection(){
    this.dgService.getDialogMessages(this.dialogId).subscribe((data:Message[]) => {
      this.messages = data;
      const websocket: WebSocket = new WebSocket(this.serverUrl);
      this.stompClient = Webstomp.over(websocket);
      this.stompClient.connect({ login: null, passcode: null }, () => {
          this.stompClient.subscribe("/dialog/" + this.dialogId, (message) => {
            this.messages.push(JSON.parse(message.body));
          });
      });

    });
  }

  ngOnInit() {
    this.addUserVisible = false;
    this.dgService.getUser().subscribe(
      (data:User) => {
        this.user=data;
      this.route.params.subscribe(params => {
        this.dialogId=params['dialogId'];
        this.dgService.getDialogInfo(this.dialogId).subscribe((data:Dialog) =>{
        this.dialog = data;
      });
      this.dgService.getDialogMembers(this.dialogId).subscribe((data:User[]) => {
        this.dialogMembers = data;
        data.forEach(user => {
          if (user.userId == this.user.userId) {
            this.access = true;
          }
        });
        if (this.access) {
          this.initializeWebSocketConnection();
        };
      },
      error => console.log(error)
      );
    });
  },
  error => console.log(error)
);
  }

  sendMessage(){
    if (this.dgService.getMessageForm().invalid) {
      alert("message is empty")
    } else {
      this.stompClient.send("/sendMessage/" , JSON.stringify({
        "text": this.dgService.getMessageForm().value.text,
        "sender": this.user,
        "dialog": this.dialog.dialogId
      }));
      this.textbox = "";
    }
  }

  openUserAddForm() {
    if (!this.addUserVisible) {
      this.addUserVisible = true;
    }
  }

  closeUserAddForm() {
    if (this.addUserVisible) {
      this.addUserVisible = false;
    }
  }

  deleteDialog() {
    if (confirm("Are you sure")) {
      this.dgService.deleteDialog(this.dialogId).subscribe(data => this.location.navigateByUrl('/dialogsList'));
    }
  }

  liveDialog() {
    if (confirm("Are you sure")) {
      this.dgService.liveDialog(this.dialogId).subscribe(data => this.location.navigateByUrl('/dialogsList'));
    }
  }

  invite() {
    this.dgService.addUserInDialog(this.dialogId).subscribe(data => console.log(1234));
    this.closeUserAddForm();
  }

}
