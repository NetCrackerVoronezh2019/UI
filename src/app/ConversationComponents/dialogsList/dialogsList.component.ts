import { Component, OnInit } from '@angular/core';
import { DialogsListService} from './Services/dialogsList.service'
import { User } from '@ConversationClasses/User'
import { Dialog } from '@ConversationClasses/dialog'

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogsList.component.html',
  styleUrls: ['./dialogsList.component.scss'],
  providers:[DialogsListService]
})
export class DialogsListComponent implements OnInit {

  constructor(public dgService:DialogsListService) { }

  user:User;
  dialogs:Dialog[];
  creationDialogVisible:boolean = false;
  newDialogName:string = "";

  ngOnInit() {
      this.creationDialogVisible=false;
      this.dgService.getUser().subscribe(
        (data:User) => {
          console.log(data);
          this.user=data;
          this.showDialogList();
        },
        error => console.log(error)
      );
  }

  showDialogList() {
    this.dgService.getUserDialogs().subscribe(
      (data:Dialog[]) => {
        console.log(data);
        this.dialogs=data;
      },
      error => console.log(error)
    );
  }

  openDialogform() {
     if (!this.creationDialogVisible) {
       this.creationDialogVisible = true;
     }
  }

  closeDialogForm() {
    this.creationDialogVisible = false;
  }

  createDialog() {
    if (this.dgService.getDialogCreationForm().invalid) {
      alert("Invalid dialog name")
    } else {
      this.dgService.CreateDialog().subscribe(
        data => {
          this.showDialogList();
        },
        error => console.log(error)
      );
      this.creationDialogVisible = false;
    }
    this.newDialogName = "";
  }

}
