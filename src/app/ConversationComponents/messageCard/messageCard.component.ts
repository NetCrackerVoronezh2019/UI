import { Component, Input,OnInit,Output, EventEmitter } from '@angular/core';
import { Message } from '@ConversationClasses/message'
import { Notification } from '@ConversationClasses/Notification'
import {DialogService} from '../dialog/Services/dialog.Service'
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
  images:string[] = [];
  files:string[] = [];
  fileNames:string[] = [];
  messageImages:any[] = [];
  @Output() imageClick = new EventEmitter()
  constructor(private service:DialogService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
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
          let blob:any = new Blob([response.blob()], { type:fileType});
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

}
