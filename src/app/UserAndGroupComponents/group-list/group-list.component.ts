import { Component, OnInit } from '@angular/core';
import { GroupListService} from './Services/group-list.service'
import { Group } from '@UserAndGroupClasses/group'
import { User } from '@UserAndGroupClasses/user'
import {Subject } from '@UserAndGroupClasses/subject'

@Component({
  selector: 'app-groups',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  providers:[GroupListService]
})
export class GroupListComponent implements OnInit {

  groups:Group[];
  user:User;
  creationGroupVisible:boolean;
  searchPanelVisible:boolean;
  subjects:Subject[];

  constructor(public groupService:GroupListService) {
      this.groupService.getUser().subscribe((data:User) => {
        this.user=data;
        console.log(data);
        this.showGropList();
      });
  }

  ngOnInit() {
    this.groupService.getAllSubjects().subscribe((data:Subject[]) => {
      this.subjects = data;
      console.log(this.subjects);
    })
  }

  openGroupForm() {
    if (!this.creationGroupVisible) {
      this.creationGroupVisible = true;
    }
  }

  closeGroupForm() {
    if (this.creationGroupVisible) {
      this.creationGroupVisible = false;
    }
  }

    openSearchPanel() {
      if (!this.searchPanelVisible) {
        this.searchPanelVisible = true;
      }
    }

    closeSearchPanel() {
      if (this.searchPanelVisible) {
        this.searchPanelVisible = false;
        this.showGropList();
      }
    }

    showGropList() {
        this.groupService.showGroupList().subscribe((data:Group[]) => {this.groups = data})
    }

    createGroup() {
      if (this.groupService.getGroupCreationForm().invalid) {
        alert("Неподходящее имя")
      } else if (this.groupService.getGroupCreationForm().value.groupSection == "") {
          alert("Вы не выбрали раздел")
      }else {
        this.groupService.CreateGroup().subscribe(
          data => {
            this.showGropList();
          },
          error => console.log(error)
        );
        this.creationGroupVisible = false;
      }
    }

    search() {
      if (this.groupService.getGroupSearchPanel().invalid) {
        alert("Invalid group name")
      } else {
        this.groupService.search().subscribe(
          (data:Group[]) => {
            this.groups = data;
          }
        )
      }
    }

}
