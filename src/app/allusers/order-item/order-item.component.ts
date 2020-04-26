import { Component, OnInit,Input} from '@angular/core';
import {Order} from '../../classes/order'
import {OrderService} from '../services/order.service'
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  providers:[OrderService]
})
export class OrderItemComponent implements OnInit {

  @Input() order:Order;
  @Input() myRole:String;
  public ok=false;
  reiting:any;
  constructor(private service:OrderService) { }

  ngOnInit() {
    console.log(this.myRole)
  }

  raitingClick(event)
  {
    
    this.reiting=event.target.attributes.value.value;
  }


  getOrder()
  {
    this.service.getOrder(this.order.orderId)
    .subscribe(
      (data:Order)=>this.order=data,
      error=>console.log(error)
    )
  }
  show()
  {
    this.ok=true;
  }
  changeOrderStatus()
  {
    console.log(this.order);
    this.service.changeOrderStatus(this.order)
    .subscribe(
      (data)=>{this.getOrder()},
      (error)=>console.log(error)
    )    
  }

  sendFeedBack(order:Order)
  {
    console.log(order);
    this.service.sendFeedBack(this.reiting,order)
        .subscribe(
          data=>{this.ok=false,this.getOrder()},
          error=>{console.log(error),this.ok=false;}
        )
  }

}
