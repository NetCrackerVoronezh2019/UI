import { Component, Input,OnInit,Output, EventEmitter } from '@angular/core';
import { Message } from '@ConversationClasses/message'
import { Notification } from '@ConversationClasses/Notification'
import {DialogService} from '../chat/Services/chat.service'
import * as fileSaver from 'file-saver';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-message-card',
  templateUrl: './messageCard.component.html',
  styleUrls: ['./messageCard.component.scss'],
  providers:[DialogService]
})
export class MessageCardComponent implements OnInit {

  @Input() message:Message;
  @Input() mymessage:boolean;
  @Input() type:string;
  images:string[] = [];
  files:string[] = [];
  fileNames:string[] = [];
  messageImages:any[] = [];
  userImage:any = null;
  loading = false;
  @Output() imageClick = new EventEmitter()
  @Output() setMessage = new EventEmitter()
  @Output() addAdvertismentFiles = new EventEmitter()
  constructor(private service:DialogService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.message.sender.image != null) {
      this.downloadProfileImage(this.message.sender.image);
    }
    for (let i = 0;i < this.message.files.length;i++) {
      if(this.message.names[i].split('.')[1]!='pdf') {
        this.images.push(this.message.files[i]);
      }
      else {
        this.files.push(this.message.files[i]);
        this.fileNames.push(this.message.names[i]);
      }
    }
    this.downloadDialogImages(this.images);
  }

  download(key,name)
  {
    let fileType:any;
    if(name.split('.')[1]=='pdf')
    fileType='application/pdf; charset=utf-8';
    else
      fileType='image/jpg; charset=utf-8';
    this.service.downloadDialogFile(key)
      .subscribe(
        (response) => {
          console.log(response);
          let blob:any = new Blob([response.blob()], { type:fileType});
          console.log(blob);
          fileSaver.saveAs(blob,name);
        },
         error => console.log('Error downloading the file')
      )
  }

  downloadDialogImages(keys:String[])
  {
    for (let key of keys) {
    this.service.downloadDialogFile(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          let postImage:any = URL.createObjectURL(blob)
          postImage = this.sanitizer.bypassSecurityTrustUrl(postImage);
          this.messageImages.push(postImage);
        },
         error => console.log('Error')
      )
    }
  }

  openImage(img) {
    this.imageClick.emit(img);
  }


  downloadProfileImage(key:String)
  {

    this.service.downloadProfileImage(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          this.userImage=URL.createObjectURL(blob)
          this.userImage=this.sanitizer.bypassSecurityTrustUrl(this.userImage);
          this.loading = true;
        },
         error => console.log('Error')
      )

  }

  startSetMessage() {
    this.setMessage.emit(this.message)
  }

  addAttachmentsFromDialog() {
    let files:any[] = [];
    for (let i = 0;i < this.message.files.length;i++) {
      let file = {

      }
    }
  }

}
