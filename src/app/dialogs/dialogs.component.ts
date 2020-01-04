import { Component, OnInit } from '@angular/core';
import {DialogsService} from './Services/dialogs.service'

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
  providers:[DialogsService]
})
export class DialogsComponent implements OnInit {

  constructor(public dgService:DialogsService) { }

  userName:String;

  ngOnInit() {
      this.userName = this.dgService.getUserName();
  }

}
