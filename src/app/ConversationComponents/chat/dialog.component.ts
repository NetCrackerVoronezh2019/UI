import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from './Services/chat.service'
import { ActivatedRoute, Router} from '@angular/router';
import { User } from '@ConversationClasses/User'
import { User as Friend } from '@UserAndGroupClasses/user'
import { Dialog } from '@ConversationClasses/dialog'
import { Message } from '@ConversationClasses/message'
import { Notification } from '@ConversationClasses/Notification'
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';
import $ from 'jquery';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-chat',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers:[DialogService]
})
export class ChatComponent implements OnInit {

  dialogId:string;
  access:boolean = false;
  userSearchPanelVisible:boolean = false;
  dialogMembers:User[] = [];
  messages:Message[] = [];
  private serverUrl = 'ws://95.30.222.140:9080/socket/websocket'
  private stompClient:Client;
  private stompClient2:Client;
  dialog:Dialog;
  user:User;
  anUser:User;
  textbox:string = "";
  users:Friend[];
  dialogImage:any;
  loading = false;
  settingsVisible = false;
  avatar:any;
  fileName:any;
  allFiles:any[]=[];
  allNames:any[]=[];
  fullImage:any = null;
  sidebarVisible = false;
  name:string = "";
  setId:number;
  isSet = false;
  date:string = '';

  constructor(public dgService:DialogService,private route: ActivatedRoute,private location: Router, private sanitizer: DomSanitizer) {
  }

  initializeWebSocketConnection(){
    this.dgService.getDialogMessages(this.dialogId).subscribe((data:Message[]) => {
      this.messages = data;
      console.log(this.messages);
      for (let i = 0;i < this.dialog.countNotification;i++) {
            this.messages[this.messages.length -1 -i].isNoRead = true
        }
      setInterval(() => {this.cleanNotifications();},10000);
      const websocket: WebSocket = new WebSocket(this.serverUrl);
      const websocket2: WebSocket = new WebSocket(this.serverUrl);
      this.stompClient = Webstomp.over(websocket);
      this.stompClient2 = Webstomp.over(websocket2);
      this.stompClient.connect({ login: null, passcode: null }, () => {
          this.stompClient.subscribe("/dialog/" + this.dialogId, (message) => {
            var mes:Message = JSON.parse(message.body);
            if (mes.sender.userId != this.user.userId) {
              mes.isNoRead = true;
            }
            this.messages.push(mes);
          });
      });
      this.stompClient2.connect({ login: null, passcode: null }, () => {
          this.stompClient.subscribe("/readMessages/" + this.dialogId, (message) => {
            var us:User = JSON.parse(message.body);
            if (us.userId != this.user.userId) {
                let i = 0;
                while (i < this.messages.length && this.messages[this.messages.length -1 -i].sender.userId !=this.user.userId) {
                  i++;
                }
                while (i < this.messages.length && !this.messages[this.messages.length -1 -i].readBySomebody) {
                  this.messages[this.messages.length -1 -i].readBySomebody = true;
                  i++;
                }
            }
          });
      });
    });
  }

  ngOnInit() {
    this.userSearchPanelVisible = false;
    this.dgService.getUser().subscribe(
      (data:User) => {
        this.user=data;
      this.route.params.subscribe(params => {
        this.dialogId=params['dialogId'];
        this.dgService.getDialogInfo(this.dialogId).subscribe((data:Dialog) =>{
        this.dialog = data;
        this.date = this.dialog.lastMessageDate.split('T')[0]+' '+ (this.dialog.lastMessageDate.split('T')[1]).split('.')[0];
      this.dgService.getDialogMembers(this.dialogId).subscribe((data:User[]) => {
        this.dialogMembers = data;
        data.forEach(user => {
          if (user.userId == this.user.userId) {
            this.access = true;
          }
        });
        if (this.access) {
          this.initializeWebSocketConnection();
          if (this.dialog.type=="private") {
              if (this.dialogMembers[0].userId != this.user.userId) {
                this.anUser = this.dialogMembers[0]
              } else {
                this.anUser = this.dialogMembers[1]
              }
              this.name = this.anUser.name;
              if (this.anUser.image != null) {
                this.downloadUserImage(this.anUser.image);
              }
            } else if (this.dialog.type == "group") {
              this.name = this.dialog.name;
              if (this.dialog.image!=null) {
               this.downloadGroupImage(this.dialog.image);
              }
            } else if (this.dialog.type == "advertisement") {
              this.name = this.dialog.name;
              if (this.dialog.image != null) {
                this.downloadCoverImage(this.dialog.image);
              }
            } else {
            this.name = this.dialog.name;
            if (this.dialog.image!=null) {
             this.downloadProfileImage(this.dialog.image);
            }
          }
        };
      },
      error => console.log(error)
      );
    });
    });
  },
  error => console.log(error)
);
  }

  cleanNotifications() {
    this.stompClient.send("/dialog/cleanNotifications", JSON.stringify({
      "userId": this.user.userId,
      "dialogId": this.dialog.dialogId
    }))
    let i = 0;
    while (i < this.messages.length && this.messages[this.messages.length -1 -i].isNoRead) {
      this.messages[this.messages.length -1 -i].isNoRead = false;
      this.messages[this.messages.length -1 -i].readBySomebody = true;
      i++;
    }
  }

  sendMessage(){
    this.cleanNotifications();
    if (this.dgService.getMessageForm().invalid && this.allFiles.length == 0) {
      alert("message is empty")
    } else {
      this.dgService.sendMessage(this.user,this.dialogId,this.allFiles, this.allNames).subscribe();
      this.textbox = "";
      this.allNames.splice(0,this.allFiles.length);
      this.allFiles.splice(0,this.allFiles.length);
    }
  }

  openUserAddForm() {
    this.dgService.getFriends().subscribe((data:Friend[]) => {
      this.users = data;
      this.userSearchPanelVisible = true;
    })
  }

  closeUserAddForm() {
    if (this.userSearchPanelVisible) {
      this.userSearchPanelVisible = false;
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

  invite(user:Friend) {
      if (confirm("Добавить " + user.lastName + ' ' + user.firstName)) {
      this.dgService.addUserInDialog(this.dialogId, user.userId).subscribe(data => {
        let us:User = {
          name: user.lastName + ' ' + user.firstName,
          userId: user.userId,
          image: user.image
        }
        this.dialogMembers.push(us);
      });
      this.closeUserAddForm();
    }
  }

  search() {
    this.dgService.search().subscribe((data:Friend[]) => {
      this.users = data;
    })
  }

  downloadProfileImage(key:String)
  {

    this.dgService.downloadDialogFile(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          this.dialogImage=URL.createObjectURL(blob)
          this.dialogImage=this.sanitizer.bypassSecurityTrustUrl(this.dialogImage);
          this.loading = true;
        },
         error => console.log('Error')
      )

  }

  showSettings() {
    this.settingsVisible = true;
    this.dgService.getDialogSettingsForm().reset({name: this.dialog.name})
  }

  closeSetings() {
    this.settingsVisible = false;
  }

  acceptSettings() {
    this.dgService.submitSettings(this.dialogId).subscribe(data => {
      this.dialog.name = this.dgService.getDialogSettingsForm().value.name;
      this.settingsVisible = false;
    })
  }

  handleFileInput(file: FileList) {

  this.fileName = file.item(0).name;
  this.readFile(file.item(0));
  }

    readFile(file)
    {
      let reader;
      reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.avatar = reader.result;
      };
    }

    setAvatar() {
      this.dgService.submitAvatar(this.dialogId,this.avatar).subscribe(data => {
        this.dialogImage = this.avatar;
        this.dialog.image = "";
        this.loading = true;
      })
    }

    handleFileMessageInput(file: FileList) {

       for(let i=0;i<file.length;i++)
       {
          this.allNames.push(file.item(i).name);
          this.readMessageFile(file.item(i));
       }

      }

      readMessageFile(file)
      {
        let reader;
        reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        this.allFiles.push(reader.result);
        };
      }

      deleteImageFromList(index)
      {
        this.allNames.splice(index,1);
        this.allFiles.splice(index,1);
      }

      openImage(image:any) {
        this.fullImage = image;
      }

      closeImage() {
        this.fullImage = null;
      }

      sidebarOpen() {
        this.sidebarVisible = !this.sidebarVisible;
      }

      downloadUserImage(key:String)
      {
        this.dgService.downloadProfileImage(key)
          .subscribe(
            (response) => {
              let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
              this.dialogImage=URL.createObjectURL(blob)
              this.dialogImage=this.sanitizer.bypassSecurityTrustUrl(this.dialogImage);
              this.loading = true;
            },
             error => console.log('Error')
          )

      }

      downloadGroupImage(key:String)
      {

        this.dgService.downloadGroupImage(key)
          .subscribe(
            (response) => {
              let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
              this.dialogImage=URL.createObjectURL(blob)
              this.dialogImage=this.sanitizer.bypassSecurityTrustUrl(this.dialogImage);
              this.loading = true;
            },
             error => console.log('Error')
          )

      }

      downloadCoverImage(key:String)
      {

        this.dgService.downloadFile(key)
          .subscribe(
            (response) => {
              let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
              this.dialogImage=URL.createObjectURL(blob)
              this.dialogImage=this.sanitizer.bypassSecurityTrustUrl(this.dialogImage);
            },
             error => console.log('Error')
          )
      }

      startSetMessage(message) {
        this.setId = message.messageId;
        this.dgService.getMessageForm().reset({text:message.text});
        this.isSet = true;
      }

      setMessage() {
        this.dgService.setMessage(this.setId).subscribe(data => {
          this.dgService.getDialogMessages(this.dialogId).subscribe((data:Message[]) => {
            this.messages = data;
            this.closeSetMessage();
          });
        });
      }

      closeSetMessage() {
        this.dgService.getMessageForm().reset();
        this.isSet = false;
      }

      addAttachmentsFromDialog(files) {
        this.dgService.addAttachmentsFromDialog(this.dialogId,files).subscribe(data => {
          alert("Файлы сообщения помечены, как решение")
        })
      }
}
