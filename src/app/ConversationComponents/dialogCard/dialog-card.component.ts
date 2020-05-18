import { Component, Input,OnInit } from '@angular/core';
import { Dialog } from '@ConversationClasses/dialog'
import {DialogService} from '../chat/Services/chat.service'
import { DomSanitizer } from "@angular/platform-browser";
import { User } from '@ConversationClasses/User'

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss'],
  providers:[DialogService]
})
export class DialogCardComponent implements OnInit {

  @Input() dg:Dialog;
  @Input() userId:number;
  dialogImage:any;
  loading = false;
  user:User;
  name:string = "";
  constructor( private sanitizer: DomSanitizer,private ds:DialogService) { }

  ngOnInit() {
    if (this.dg.type=="private") {
      this.ds.getDialogMembers(this.dg.dialogId).subscribe((data:User) => {
        if (data[0].userId != this.userId) {
          this.user = data[0]
        } else {
          this.user = data[1]
        }
        this.name = this.user.name;
        if (this.user.image != null) {
          this.downloadUserImage(this.user.image);
        }
      })
    } else if (this.dg.type == "group") {
      this.name = this.dg.name;
      if (this.dg.image!=null) {
       this.downloadGroupImage(this.dg.image);
      }
    } else {
      this.name = this.dg.name;
      if (this.dg.image!=null) {
       this.downloadProfileImage(this.dg.image);
      }
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

  downloadUserImage(key:String)
  {
    this.ds.downloadProfileImage(key)
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

    this.ds.downloadGroupImage(key)
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
