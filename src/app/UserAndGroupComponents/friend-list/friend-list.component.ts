import { Component, OnInit } from '@angular/core';
import { FriendListService} from './Services/friend-list.service'
import { User } from '@UserAndGroupClasses/user'

@Component({
  selector: 'app-frends',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  providers:[FriendListService]
})
export class FriendListComponent implements OnInit {

  user:User;
  searchPanelVisible:boolean;
  users:User[];
  friends:User[];
  outgoing:User[];
  ingoing:User[];
  type = 0;

  constructor(public fs:FriendListService) {
      this.fs.getUser().subscribe((data:User) => {
        this.user=data;
        console.log(data);
      });
  }

  ngOnInit() {
    this.fs.getFriends().subscribe((data:User[]) => {
      this.friends = data;
      this.users = this.friends;
    })
    this.fs.getIngoing().subscribe((data:User[]) => {
      this.ingoing = data;
    })
    this.fs.getOutgoing().subscribe((data:User[]) => {
      this.outgoing = data;
    })
  }

  openSearchPanel() {
    if (!this.searchPanelVisible) {
      this.searchPanelVisible = true;
    }
  }

  closeSearchPanel() {
    if (this.searchPanelVisible) {
      this.users = this.friends
      this.searchPanelVisible = false;
    }
  }

  search() {
    this.fs.getFriends().subscribe((data:User[]) => {
      this.friends = data;
      this.fs.getIngoing().subscribe((data:User[]) => {
        this.ingoing = data;
        this.fs.getOutgoing().subscribe((data:User[]) => {
          this.outgoing = data;
          this.fs.search().subscribe((data:User[]) => {
            this.type = 0;
            this.users = data;
          })
        })
      })
   })
  }

  showFriends() {
    this.fs.getFriends().subscribe((data:User[]) => {
      this.friends = data;
      this.users = this.friends;
      this.type = 3;
    })
  }

  showIngoing() {
    this.fs.getIngoing().subscribe((data:User[]) => {
      this.ingoing = data;
      this.users = this.ingoing;
      this.type = 4;
    })
  }

  showOutgoing() {
    this.fs.getOutgoing().subscribe((data:User[]) => {
      this.outgoing = data;
      this.users = this.outgoing;
      this.type = 2;
    })
  }

}
