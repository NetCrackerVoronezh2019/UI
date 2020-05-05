import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { FriendsNotification } from "@UserAndGroupClasses/friendsNotification";
import { FriendListService } from "src/app/UserAndGroupComponents/friend-list/Services/friend-list.service";

@Component({
  selector: 'app-friends-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers:[FriendListService]
})
export class FriendsNotificationsComponent implements OnInit {
  @Input() notifications:FriendsNotification[];
  @Output() deleteNot = new EventEmitter()

  constructor(private service:FriendListService) { }

  ngOnInit() {
  }

  accept(userId, index) {
    this.service.addFriend(userId).subscribe(data => {
        this.deleteNot.emit(index);
    });
  }

  ignore(id,index) {
    this.service.ignoreNotification(id).subscribe(data => {
      this.deleteNot.emit(index);
    })
  }
}
