import { Component, OnInit } from '@angular/core';
import { DialogsListService} from './Services/chatsList.service'
import { User } from '@UserAndGroupClasses/user'
import { Dialog } from '@ConversationClasses/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogsList.component.html',
  styleUrls: ['./dialogsList.component.scss'],
  providers:[DialogsListService]
})
export class DialogsListComponent implements OnInit {

  constructor(public dgService:DialogsListService, private router: Router) { }

  user:User;
  dialogs:Dialog[];
  creationDialogVisible:boolean = false;
  newDialogName:string = "";
  type = "all";
  userSearchPanelVisible = false;
  users:User[];
  avatar:any;
  fileName:any;

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
        this.type = 'all';
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
      this.dgService.CreateDialog(this.avatar).subscribe(
        data => {
          this.showDialogList();
        },
        error => console.log(error)
      );
      this.creationDialogVisible = false;
    }
    this.newDialogName = "";
  }

  showDialogListByType(type) {
    console.log(type)
    this.dgService.getUserDialogsByType(type).subscribe(
      (data:Dialog[]) => {
        console.log(data);
        this.dialogs=data;
        this.type = type;
      },
      error => console.log(error)
    );
  }

  startDialogWithUser(userId) {
    this.dgService.startDialogWithUser(userId).subscribe((data:number) => {
      this.router.navigate(['dialog/' + data]);
    })
  }

  openUserSearchPanel() {
    this.dgService.getFriends().subscribe((data:User[]) => {
      this.users = data;
      this.userSearchPanelVisible = true;
    })
  }

  search() {
    this.dgService.search().subscribe((data:User[]) => {
      this.users = data;
    })
  }

  cancelSearch() {
    this.userSearchPanelVisible = false;
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

}
