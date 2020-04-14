import { Component, Input,OnInit } from '@angular/core';
import { FriendCardService} from './Services/friend-card.service'
import { User } from '@UserAndGroupClasses/user'

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

  constructor(private fcs:FriendCardService) { }

  ngOnInit() {
    this.type = this.i_type;

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

}
