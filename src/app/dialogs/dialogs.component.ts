import { Component, OnInit } from '@angular/core';
import { DialogsService} from './Services/dialogs.service'
import { User } from './User'
import { Dialog } from './dialog'

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
  providers:[DialogsService]
})
export class DialogsComponent implements OnInit {

  constructor(public dgService:DialogsService) { }

  user:User;
  dialogs:Dialog[];

  ngOnInit() {
      this.dgService.getUser('1').subscribe(
        (data:User) => {
          console.log(data);
          this.user=data;
        },
        error => console.log(error)
      );
      this.dgService.getUserDialogs('1').subscribe(
        (data:Dialog[]) => {
          console.log(data);
          this.dialogs=data;
        },
        error => console.log(error)
      );
  }

}
