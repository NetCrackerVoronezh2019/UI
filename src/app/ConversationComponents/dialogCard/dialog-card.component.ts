import { Component, Input,OnInit } from '@angular/core';
import { Dialog } from '@ConversationClasses/dialog'

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss']
})
export class DialogCardComponent implements OnInit {

  @Input() dg:Dialog;
  constructor() { }

  ngOnInit() {
  }

}
