import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from './Services/dialog.Service'
import { ActivatedRoute} from '@angular/router';
import { User } from '@ConversationClasses/User'
import { Dialog } from '@ConversationClasses/dialog'
import { Message } from '@ConversationClasses/message'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers:[DialogService]
})
export class DialogComponent implements OnInit {

  dialogId:string;
  private userId = '1'; //test userId
  access:boolean = false;
  dialogMembers:User[];
  messages:Message[];
  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;
  dialog:Dialog;

  constructor(private dgService:DialogService,private route: ActivatedRoute) {}

  initializeWebSocketConnection(){
    this.dgService.getDialogMessages(this.dialogId).subscribe((data:Message[]) => {
      console.log(data);
      this.messages = data;
      let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.client(function() {
        return new SockJS(this.serverUrl);
      });
      let that = this;
      this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/dialog/" + this.dialogId, (message:Message) => {
        this.messages.push(message);
      });
    });
    });
  }

  sendMessage(){

  }


  ngOnInit() {
      this.route.params.subscribe(params => {
      this.dialogId=params['dialogId'];
      this.dgService.getDialogInfo(this.dialogId).subscribe((data:Dialog) => this.dialog = data);
      this.dgService.getDialogMembers(this.dialogId).subscribe((data:User[]) => {
        this.dialogMembers = data;
        data.forEach(user => {
          if (<string><unknown>user.userId == this.userId) {
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
  }

}
