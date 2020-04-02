import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Group } from '@UserAndGroupClasses/group'
import { User } from '@UserAndGroupClasses/user'
import { UserService } from './Service/User.service'


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  providers:[UserService]
})
export class UserPageComponent implements OnInit {
  userId:string;
  yourPage = false;
  user:User;
  you:User;

  constructor(private route: ActivatedRoute,private location: Router,private us: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId=params['userId'];
      this.us.getThisUser().subscribe((data:User) =>{
        this.you = data;

        if (this.you.userId == +this.userId) {
          this.yourPage = true;
          this.user = this.you;
        } else {
          this.us.getUser(this.userId).subscribe((data:User) =>{
            this.user = data;
            console.log(this.user);
          })
        }
      });
    })
  }
}
