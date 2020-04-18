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


  editOrder:Order=new Order();
  displayedColumns: string[] = ['orderId', 'freelancerId', 'advertisementId',
  'advertisementName','status','actions'];
  isEdited:Boolean=true;
  dataSource:Order[]=[];
  check:Boolean=false;
  userId:Number;
  nextStatus:any;
  ngOnInit() {
    this.getMyOrders()
    this.getMyId();
    

  }

  
  change(row:Order)
  {
    this.isEdited=false;
    this.editOrder=row;
    this.service.setStatus(row.status);
  }

  getMyOrders()
  {
    this.service.getMyOrders()
    .subscribe(
      (data:Order[])=>{this.dataSource=data,this.check=true,console.log(data)},
      error=>console.log(error)
    )
  }

  getMyId()
  {
    this.service.getMyId()
      .subscribe(
        (data:Number)=>{this.userId=data,console.log(this.userId)},
        (error)=>console.log(error)
      )
  }

  changeOrderStatus(row)
  {
    console.log(row);
    this.service.changeOrderStatus(row)
    .subscribe(
      (data)=>{this.getMyOrders(),this.isEdited=true},
      (error)=>console.log(error)
    )    
  }

}
