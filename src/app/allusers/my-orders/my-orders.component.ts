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

  dataSource:Order[]=[];
  userId:Number;
  myRole:any;
  reiting:any;
  state='ACCEPTED';
  sended=false;
  ngOnInit() {
    this.getMyOrders()
    this.getMyId();
    this.getMyRole();
  }


  setStatus(someobject)
  {
    let state=someobject.target.attributes['state'].value
    this.state=state;

    this.getMyOrders();
  }

 getMyRole()
 {
   this.service.getMyRole()
      .subscribe(
        (data:any)=>{
          if(data!=null)
          {
            this.myRole=data.roleName;
            console.log(this.myRole);
          }
        },
        error=>console.log(error)
      )
 }
  
 
  getMyOrders()
  {
    this.service.getMyOrders(this.state)
    .subscribe(
      (data:Order[])=>{this.dataSource=data,console.log(data)},
      error=>{console.log(error),this.dataSource=[]}
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



 

}
