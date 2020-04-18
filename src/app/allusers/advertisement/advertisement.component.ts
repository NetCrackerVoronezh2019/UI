import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {AdvertisementService1} from '../services/advertisement.service';
import {AdvertisementService} from '../../student/services/advertisement.service'
import {Order} from '../../classes/order'
import {OrderService} from '../services/order.service'

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers:[AdvertisementService1,AdvertisementService,OrderService]
})
export class AdvertisementComponent implements OnInit {
  img:any;
  id:Number;
  role:any;
  adv:Advertisement;
  isUserAdv:Boolean=false;
  isLoading=false;
  subscription:Subscription;
  can:Boolean=false;
  order:Order;
  message:String='Вы точно хотите получить этот заказ ?'
  buttonHidden:Boolean=true;
  constructor(private service:AdvertisementService1, private service2:AdvertisementService,
    private activateRoute: ActivatedRoute,
    private orderService:OrderService) { }

  ngOnInit() {
      
      this.subscription=this.activateRoute.params.subscribe(params=>{
        this.id=params['id'];
        this.getAdvById(this.id);
        this.getRole();
      } 
    );
  }


  isMyOrder()
  {
    this.service.myOrder(this.id)
        .subscribe(
          (data:Order)=>{this.order=data,console.log(data)},
          (error)=>console.log(error)
        )
  }


  changeStatus()
  {
    this.orderService.changeOrderStatus(this.order)
      .subscribe(
        (data)=>this.isMyOrder(),
        error=>console.log(error)
      )
  }
  

  changeMessage(){
    if(this.role=="ROLE_TEACHER")
      this.message='Вы точно хотите получить этот заказ ?';
    else
    {
      this.message='Вы точно хотите получить этy услугу ?';
    }
  }
  
  getRole()
  {
    this.service.getRole()
    .subscribe(
      (data:any)=>
      {
        this.role=data.roleName;
        this.isMyAdv(this.id);
        this.canSendRequest();
        this.isMyOrder();
        this.changeMessage();
      },
      error=>{console.log(error)}
    )
  }

  getAdvById(id)
  {
    console.log("user"+id);
    this.service.getAdvertisementById(id)
    .subscribe(
      (data:Advertisement)=>{this.adv=data;this.isLoading=true;},
      error=>console.log(error)
    )
  }

  isMyAdv(id:Number)
  {
    this.service.isMyAdvertisement(id)
    .subscribe(
      (data:Boolean)=>{this.isUserAdv=data,console.log(this.isUserAdv+"isuseradv")},
      (error)=>console.log(error)
    )
  }

  sendNotification()
  {
    this.service.sendNotification(this.adv,this.role)
    .subscribe(
      (data)=>{this.message="Всё прошло успешно !", this.canSendRequest(); this.buttonHidden=false},
      error=>{this.message="Ошибка при отправке"; this.buttonHidden=false}
      )
  }  

  canSendRequest()
  {
    this.service.canSendRequest(this.id)
    .subscribe(
      (data:Boolean)=>this.can=data,
      error=>console.log(error)
    )
  }
  
}
