import { Component, OnInit,NgModule} from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {GroupListService} from '../group-list/Services/groupList.service';
import {MatInputModule} from '@angular/material/input';
import { Router} from '@angular/router';
import { Group } from '@UserAndGroupClasses/group'
import { User } from '@UserAndGroupClasses/user'
import {Subject } from '@UserAndGroupClasses/subject'

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
  providers:[GroupListService]
})

export class GroupCreateComponent implements OnInit {

  subjects:Subject[];
  avatar:any;
  fileName:any;
  user:User;

  constructor(public groupService:GroupListService,private router:Router) {

  }
  ngOnInit() {
    this.groupService.getUser().subscribe((data:User) => {
      this.user=data;
    });
    this.groupService.getAllSubjects().subscribe((data:Subject[]) => {
      this.subjects = data;
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
      };
    }

    deleteImage() {
      this.fileName = null;
      this.avatar = null;
    }

    onSubmit() {
      if (this.groupService.getGroupCreationForm().invalid) {
        alert("Неподходящее имя")
      } else if (this.groupService.getGroupCreationForm().value.groupSection == "") {
          alert("Вы не выбрали раздел")
      }else {
        this.groupService.CreateGroup(this.avatar).subscribe(
          data => {
              this.router.navigate(['groupList/']);
          },
          error => console.log(error)
        );
      }
    }

}
