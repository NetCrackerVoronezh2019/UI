import { Component, Input,OnInit } from '@angular/core';
import { Message } from '@ConversationClasses/message'
import { Notification } from '@ConversationClasses/Notification'

@Component({
  selector: 'app-message-card',
  templateUrl: './messageCard.component.html',
  styleUrls: ['./messageCard.component.scss']
})
export class MessageCardComponent implements OnInit {

  @Input() message:Message;
  background = 'white'
  constructor() { }

  ngOnInit() {
  }



}
