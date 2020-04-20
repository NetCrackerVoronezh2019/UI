import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Group } from '@UserAndGroupClasses/group'
import { User } from '@UserAndGroupClasses/user'
import { Post } from '@UserAndGroupClasses/post'
import {GroupService} from './Services/group.service'
import {Subject } from '@UserAndGroupClasses/subject'

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
  admin = false;
  subscriber = false;
  users:User[];
  admins:User[];
  subscriversVisible = false;
  settingsVisible = false;
  thisusergroups:Group[];
  subjects:Subject[];
  addAdmin = false;
  removeAdmin = false;
  posts:Post[];
  createPostVisible = false;
  avatar:any;
  fileName:any;
  allFiles:any[]=[];
  allNames:any[]=[];

  constructor(private route: ActivatedRoute,private location: Router,private gs: GroupService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId=params['groupId'];
      this.getGroupPosts();
      this.gs.getAdmins(this.groupId).subscribe((data:User[]) => {
        this.admins = data;
      })
      this.gs.getGroup(this.groupId).subscribe((data:Group) => {
        this.group = data;
        this.gs.getUserGroups().subscribe((data:Group[]) => {
          this.thisusergroups = data;
          this.thisusergroups.forEach(element => {
              if (element.groupId == this.group.groupId) {
                this.subscriber = true;
              }
        })
        this.gs.getThisUser().subscribe((data:User) =>{
            this.user = data;
            this.creator = (this.user.userId == this.group.creatorId);
            this.admins.forEach(element => {
              if (element.userId == this.user.userId) {
                this.admin = true;
              }
            });
            });
          })
      })
    })
  }

  showSubscribers() {
    if (!this.subscriversVisible) {
      this.gs.getGroupUsers(this.groupId).subscribe((data:User[]) => {
        this.users = data;
        this.subscriversVisible = true;
      });
    }
  }


    closeSubscribers() {
      if (this.subscriversVisible) {
        this.subscriversVisible = false;
      }
    }

    showSetings() {
      this.gs.getAllSubjects().subscribe((data:Subject[]) => {
        this.subjects = data;
        this.subjects.forEach(element => {
            if (element.name == this.group.subjectName) {
              this.gs.getGroupSettingsForm().reset({groupSection: element.translateName, groupName: this.group.name});
            }
        });
        if (!this.settingsVisible) {
          this.settingsVisible = true;
        }
      })
      if (!this.settingsVisible) {
        this.settingsVisible = true;
      }
    }

    closeSetings() {
      if (this.settingsVisible) {
        this.settingsVisible = false;
      }
    }

    leaveGroup() {
      this.gs.leaveGroup(this.groupId).subscribe(data => {
        this.subscriber = false;
      })
    }

    subscribeGroup() {
      this.gs.subscribeGroup(this.groupId).subscribe(data => {
        this.subscriber = true;
      })
    }

    acceptSettings() {
      this.gs.groupSettingsAccept(this.group.groupId).subscribe(data => {
        this.group.name = this.gs.getGroupSettingsForm().value.groupName;
        this.subjects.forEach(element => {
            if (element.translateName == this.gs.getGroupSettingsForm().value.groupSection) {
              this.group.subjectName = element.name;
            }
        });
      })
    }

    showAddAdmin() {
      if (!this.addAdmin) {
        this.gs.getGroupUsers(this.groupId).subscribe((data:User[]) => {
          this.users = data;
          this.addAdmin = true;
        });

      }
    }

    closeAddRemoveAdmin() {
      if (this.addAdmin) {
        this.addAdmin = false;
      }
      if (this.removeAdmin) {
        this.removeAdmin = false;
      }
    }

    showRemoveAdmin() {
      if (!this.removeAdmin) {
        this.removeAdmin = true;
      }
    }

    cancelSearch() {
      this.gs.getGroupUsers(this.groupId).subscribe((data:User[]) => {
        this.users = data;
      });
    }

    search() {
      this.gs.searchUsers(this.groupId).subscribe((data:User[]) => {
        this.users = data;
      })
    }

    makeAdmin(user:User) {
      var isAdmin = false;
      this.admins.forEach(element => {
          if (element.userId == user.userId) {
            alert("пользователь уже администратор")
            isAdmin = true;
          }
      });
      if (!isAdmin && confirm('Сделать ' + user.lastName + ' ' + user.firstName + ' администратором группы?')) {
          this.gs.makeAdmin(this.groupId,user.userId).subscribe(data => {
            this.gs.getAdmins(this.groupId).subscribe((data:User[]) => {
              this.admins = data;
              this.closeAddRemoveAdmin();
            })
          });
      }
    }

    deleteAdmin(user:User) {
      if (user.userId == this.group.creatorId) {
        alert('Нельзя забрать права администратора у создателя группы')
        return;
      }
      if (confirm('Убрать ' + user.lastName + ' ' + user.firstName + ' из администраторов группы?')) {
          this.gs.deleteAdmin(this.groupId,user.userId).subscribe(data => {
            this.gs.getAdmins(this.groupId).subscribe((data:User[]) => {
              this.admins = data;
              this.closeAddRemoveAdmin();
            })
          });
      }
    }

    getGroupPosts() {
      this.gs.getGroupPosts(this.groupId).subscribe((data:Post[]) => {
        this.posts = data;
        console.log(data);
      })
    }

    showCreatePost() {
      this.allFiles =[];
      this.allNames =[];
      this.gs.getPostCreateForm().reset();
      this.createPostVisible = true;
    }

    closeCreatePost() {
      this.createPostVisible = false;
    }

    sendPost() {
      this.gs.sendPost(this.groupId,this.allFiles).subscribe(data => {
        this.getGroupPosts();
        this.createPostVisible = false;
      })
    }

    handleFileInput(file: FileList) {

    this.fileName = file.item(0).name;
    this.readFile(file.item(0));
    }

      readFile(file)
      {
        let reader;
        reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        this.avatar = reader.result;
        console.log(this.avatar);
        };
      }

      setAvatar() {
        this.gs.setAvatar(this.groupId,this.avatar).subscribe(data => {

        })
      }

      handlePostFileInput(file: FileList) {
         for(let i=0;i<file.length;i++)
         {
            this.allNames.push(file.item(i).name);
            this.readPostFile(file.item(i));
         }
        console.log(this.allFiles);

        }

        readPostFile(file)
        {
          let reader;
          reader=new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
          this.allFiles.push(reader.result);
          };
        }
}
