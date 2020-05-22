import { Component, OnInit,NgModule} from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {DialogsListService} from '../dialogsList/Services/chatsList.service';
import {MatInputModule} from '@angular/material/input';
import { User } from '@UserAndGroupClasses/user'
import { Dialog } from '@ConversationClasses/dialog'
import { Router} from '@angular/router';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss'],
  providers:[DialogsListService]
})

export class DialogCreateComponent implements OnInit {

  avatar:any;
  fileName:any;
  user:User;

  constructor(public dgService:DialogsListService, private router: Router) {

  }
  ngOnInit() {
    this.dgService.getUser().subscribe(
      (data:User) => {
        console.log(data);
        this.user=data;
      },
      error => console.log(error)
    );
  }


  createDialog() {
    if (this.dgService.getDialogCreationForm().invalid) {
      alert("Invalid dialog name")
    } else {
      this.dgService.CreateDialog(this.avatar).subscribe(
        data => {
          this.router.navigate(['dialogsList/']);
        },
        error => console.log(error)
      );
    }
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

    deleteImage() {
      this.fileName = null;
      this.avatar = null;
    }

}
