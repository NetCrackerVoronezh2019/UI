import { Component, OnInit,Input, ɵNG_INJECTABLE_DEF} from '@angular/core';
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
  rating1:any[]=[];
  rating2:any[]=[];
  statusTranslate;
  nextStatusTranslate;



  constructor(private service:OrderService) { }

  ngOnInit() {
    if(this.order.starsForWork!=0)
        {

          for(let i=0;i<this.order.starsForWork;i++)
            this.rating1.push(1);

            for(let i=5;i>this.order.starsForWork;i--)
            this.rating2.push(1);

        }
  }

  raitingClick(event)
  {
    
    this.reiting=event.target.attributes.value.value;
  }


  getStatus(status){
        if(status=='ACCEPTED')
          return 'Принят';
        if(status=="INPROGRESS")
          return 'В процессе';
        if(status=='СOMPLETED')
          return 'Завершен'
  }

  getNextStatus(status){

    if(status=="INPROGRESS")
      return 'Начать работу';
    if(status=='СOMPLETED')
      return 'Завершить'
}


  getOrder()
  {
    this.service.getOrder(this.order.orderId)
    .subscribe(
      (data:Order)=>
      {this.order=data
        this.rating1=[]
        this.rating2=[]
        if(this.order.starsForWork!=0)
        {

          for(let i=0;i<this.order.starsForWork;i++)
            this.rating1.push(1);

            for(let i=5;i>this.order.starsForWork;i--)
            this.rating2.push(1);

        }
      },
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
