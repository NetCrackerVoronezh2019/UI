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
  groups:Group[];
  groupsVisible = false;
  friendsVisible = false;
  friends:User[];
  image:any;

  constructor(private route: ActivatedRoute,private location: Router,private us: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId=params['userId'];
      this.us.getThisUser().subscribe((data:User) =>{
        this.you = data;
        this.friendsVisible = false;
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

  showGroups() {
    if (!this.groupsVisible) {
      this.groupsVisible = true;
      this.us.getUserGroups(this.userId).subscribe((data:Group[]) => {
        this.groups = data;
      })
    }
  }

  closeGroups() {
    if (this.groupsVisible) {
      this.groupsVisible = false;
      this.groups = null;
    }
  }

  openFriends() {
    this.us.getFriends(this.userId).subscribe((data:User[]) => {
      this.friends = data;
      this.friendsVisible = true;
    })
  }

  closeFriends() {
    this.friendsVisible = false;
  }

  update()
  {
    this.us.updateImage(this.image)
      .subscribe(
        (data)=>console.log(data),
        error=>console.log(error)
      )
  }

  handleFileInput(file: FileList) {

       let reader;
       reader=new FileReader();
       reader.readAsDataURL(file.item(0));
       reader.onload = () => {
       this.image=reader.result;
       console.log(this.image);
      }; 
     }

  }