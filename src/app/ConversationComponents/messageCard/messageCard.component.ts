import { Component, Input,OnInit } from '@angular/core';
import { Message } from '@ConversationClasses/message'

@Component({
  selector: 'app-message-card',
  templateUrl: './messageCard.component.html',
  styleUrls: ['./messageCard.component.scss']
})
export class MessageCardComponent implements OnInit {

  @Input() message:Message;
  constructor() { }

  ngOnInit() {
  }

}
