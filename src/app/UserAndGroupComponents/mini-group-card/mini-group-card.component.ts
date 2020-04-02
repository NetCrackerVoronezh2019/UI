import { Component, Input,OnInit } from '@angular/core';
import { Group } from '@UserAndGroupClasses/group'

@Component({
  selector: 'app-mini-group-card',
  templateUrl: './mini-group-card.component.html',
  styleUrls: ['./mini-group-card.component.scss']
})
export class MiniGroupComponent implements OnInit {

  @Input() gr:Group;
  constructor() { }

  ngOnInit() {
  }

}
