import { Component, OnInit,Input } from '@angular/core';
import {OrderService} from '../../services/order.service'
import {Order} from '../../../classes/order';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers:[OrderService]
})
export class FeedbackComponent implements OnInit {

  constructor(private service:OrderService) { }

  reiting;
  message=undefined;
  sended=false;
  @Input() editOrder:Order;
  ngOnInit() {
    this.message=undefined;
    this.sended=false;
  }


  raitingClick(event)
  {
    this.reiting=event.target.attributes.value.value;
    console.log(this.reiting);
    console.log(this.editOrder);
  }

  sendFeedBack()
  {
    this.service.sendFeedBack(this.reiting,this.editOrder)
        .subscribe(
          data=>{this.message='Спасибо !'; this.sended=true},
          error=>{this.message='Ошибка';this.sended=true;console.log(error)}
        )
  }

}
