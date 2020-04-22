import { Component, Input,OnInit } from '@angular/core';
import { Message } from '@ConversationClasses/message'
import { Notification } from '@ConversationClasses/Notification'
import {DialogService} from '../dialog/Services/dialog.Service'
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-message-card',
  templateUrl: './messageCard.component.html',
  styleUrls: ['./messageCard.component.scss'],
  providers:[DialogService]
})
export class MessageCardComponent implements OnInit {

  @Input() message:Message;
  constructor(private service:DialogService) { }

  ngOnInit() {
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



}
