import { Component, Input,OnInit } from '@angular/core';
import { FriendCardService} from './Services/friendCard.service'
import { User } from '@UserAndGroupClasses/user'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
  providers:[FriendCardService]
})
export class FriendCardComponent implements OnInit {

  @Input() friend:User;
  @Input() user:User;
  @Input() friends:User[];
  @Input() outgoing:User[];
  @Input() ingoing:User[];
  @Input() i_type;
  type:number;
  userImage:any = null;
  loading = false;

  constructor(private fcs:FriendCardService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.type = this.i_type;
    if (this.friend.image != null) {
      this.downloadProfileImage(this.friend.image);
    }
    if (this.type == 0) {
      this.friends.forEach(element => {
        if (element.userId == this.friend.userId) {
          this.type = 3;
        }
      });
      if (this.type == 0) {
        this.outgoing.forEach(element => {
          if (element.userId == this.friend.userId) {
            this.type = 2;
          }
        });
        if (this.type == 0) {
          this.ingoing.forEach(element => {
            if (element.userId == this.friend.userId) {
              this.type = 4;
            }
          });
          if (this.type == 0) {
            this.type = 1;
          }
        }
      }
  }
  }

 addFriend() {
   this.fcs.addFriend(this.friend.userId).subscribe(data => {
     if (this.type == 1) {
       this.type = 2;
     } else if (this.type == 4) {
       this.type = 3;
     }
   })
 }

 removeFriend() {
   this.fcs.removeFriend(this.friend.userId).subscribe(data => {
     if (this.type == 2) {
       this.type = 1;
     } else if (this.type == 3) {
       this.type =4;
     }
   })
 }

 downloadProfileImage(key:String)
 {

   this.fcs.downloadProfileImage(key)
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
