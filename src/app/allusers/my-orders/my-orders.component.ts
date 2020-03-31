import { Component, OnInit } from '@angular/core';
import {Order} from '../../classes/order'
import {OrderService} from '../services/order.service'
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers:[OrderService]
})
export class MyOrdersComponent implements OnInit {

  constructor(private service:OrderService) { }

   o:Order=new Order();

  displayedColumns: string[] = ['orderId', 'freelancerId', 'advertisementId',
  'advertisementName','status','actions'];

  dataSource:Order[]=[];
  check:Boolean=false;
  ngOnInit() {
    this.getMyOrders()
  }


  getMyOrders()
  {
    this.service.getMyOrders()
    .subscribe(
      (data:Order[])=>{this.dataSource=data,this.check=true,console.log(data)},
      error=>console.log(error)
    )
  }

}
