import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Group } from '@UserAndGroupClasses/group'
import { User } from '@UserAndGroupClasses/user'
import {GroupService} from './Services/group.service'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers:[GroupService]
})
export class GroupComponent implements OnInit {
  groupId:string;
  group:Group;
  user:User;
  creator = false;
  subscriber = false;
  users:User[]

  constructor(private route: ActivatedRoute,private location: Router,private gs: GroupService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId=params['groupId'];
      this.gs.getGroup(this.groupId).subscribe((data:Group) => {
        this.group = data;
        this.gs.getGroupUsers(this.groupId).subscribe((data:User[]) => {
          this.users = data;
          console.log(data);
          this.gs.getThisUser().subscribe((data:User) =>{
            this.user = data;
            this.creator = (this.user.userId == this.group.creatorId);
            this.users.forEach(element => {
                if (element.userId == this.user.userId) {
                  this.subscriber = true;
                }
            });
          })
        })
      })
    })
  }

}
