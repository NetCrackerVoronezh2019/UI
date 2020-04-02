import { Component, Input,OnInit } from '@angular/core';
import { User } from '@UserAndGroupClasses/user'

@Component({
  selector: 'app-user-card',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() us:User;
  constructor() { }

  ngOnInit() {
  }

}
