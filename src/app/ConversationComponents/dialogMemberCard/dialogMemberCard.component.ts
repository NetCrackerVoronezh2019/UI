import { Component, Input,OnInit } from '@angular/core';
import { User } from '@ConversationClasses/User'

@Component({
  selector: 'app-dialog-member-card',
  templateUrl: './dialogMemberCard.component.html',
  styleUrls: ['./dialogMemberCard.component.scss']
})
export class DialogMemberCardComponent implements OnInit {

  @Input() us:User;
  constructor() { }

  ngOnInit() {
  }

}
