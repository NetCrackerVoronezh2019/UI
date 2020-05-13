import { Component, Input,OnInit } from '@angular/core';
import { User } from '@UserAndGroupClasses/user'
import {DialogService} from '../chat/Services/chat.service'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-dialog-member-card',
  templateUrl: './dialogMemberCard.component.html',
  styleUrls: ['./dialogMemberCard.component.scss'],
  providers:[DialogService]
})
export class DialogMemberCardComponent implements OnInit {

  @Input() us:User;
  userImage:any = null;
  loading = false;
  constructor(private service:DialogService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.us.image != null) {
      this.downloadProfileImage(this.us.image);
    }
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


}
