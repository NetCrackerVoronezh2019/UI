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
  displayedColumns: string[] = ['orderId', 'freelancer', 
  'advertisementName','status','actions','feedBack'];
  displayedColumns2: string[] = ['orderId', 'customer',
  'advertisementName','status','actions',];
  isEdited:Boolean=true;
  dataSource:Order[]=[];
  check:Boolean=false;
  userId:Number;
  nextStatus:any;
  myRole:any;
  reiting:any;
  showFeedBack=false;
  EditFeedBack=false;
  message;
  sended=false;
  ngOnInit() {
    this.getMyOrders()
    this.getMyId();
    this.getMyRole();
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

 raitingClick(event)
 {
   this.reiting=event.target.attributes.value.value;
 }

 sendFeedBack()
 {
   this.service.sendFeedBack(this.reiting,this.editOrder)
       .subscribe(
         data=>{this.message='Спасибо !'; this.sended=true,this.getMyOrders()},
         error=>{this.message='Ошибка';this.sended=true;console.log(error)}
       )
 }

  
 closeModel()
 {
   this.sended=false;
   this.service.updateOrderForm();
   this.reiting=null;
   this.showFeedBack=false;
   this.EditFeedBack=false;
 }
  change(row:Order)
  {
    this.isEdited=false;
    this.editOrder=row;
    this.service.setStatus(row.status);
  }

  ratingClick(row:Order)
  {
    this.editOrder=row;
    this.EditFeedBack=true;
    console.log(this.EditFeedBack)
  }

  showFeedBackClick(row:Order)
  {
    this.editOrder=row;
    this.showFeedBack=true;

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
