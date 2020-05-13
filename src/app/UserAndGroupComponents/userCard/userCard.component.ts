import { Component, Input,OnInit } from '@angular/core';
import { User } from '@UserAndGroupClasses/user'
import { DomSanitizer } from "@angular/platform-browser";
import {CommentService} from '../comment-card/services/comment-card.service'

@Component({
  selector: 'app-user-card',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.scss'],
  providers:[CommentService]
})
export class UserCardComponent implements OnInit {

  @Input() us:User;
  userImage:any = null;
  loading = false;
  constructor(private cs:CommentService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.us.image != null) {
      this.downloadProfileImage(this.us.image);
    }
  }


  downloadProfileImage(key:String)
  {

    this.cs.downloadProfileImage(key)
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
