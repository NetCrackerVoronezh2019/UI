import { Component, Input,OnInit } from '@angular/core';
import { Dialog } from '@ConversationClasses/dialog'
import {DialogService} from '../chat/Services/chat.service'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss'],
  providers:[DialogService]
})
export class DialogCardComponent implements OnInit {

  @Input() dg:Dialog;
  dialogImage:any;
  loading = false;
  constructor( private sanitizer: DomSanitizer,private ds:DialogService) { }

  ngOnInit() {
    if (this.dg.image!=null) {
      this.downloadProfileImage(this.dg.image);
    }
  }

  downloadProfileImage(key:String)
  {

    this.ds.downloadDialogFile(key)
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

}
