import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import {UserAdvertisementInfo} from '../../classes/userNotificationInfo'
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {AdvertisementService1} from '../services/advertisement.service';
import {AdvertisementService} from '../../student/services/advertisement.service'

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers:[AdvertisementService1,AdvertisementService]
})
export class AdvertisementComponent implements OnInit {
  id:Number;
  role:any;
  adv:Advertisement;
  isUserAdv:Boolean=false;
  isLoading=false;
  subscription:Subscription;
  can:Boolean=false;
  message:String='Вы точно хотите получить этот заказ ?'
  buttonHidden:Boolean=true;
  constructor(private service:AdvertisementService1, private service2:AdvertisementService,private activateRoute: ActivatedRoute) { }

  ngOnInit() {
      
      this.subscription=this.activateRoute.params.subscribe(params=>{
        this.id=params['id'];
        this.getAdvById(this.id);
        this.getRole();
      } 
    );

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
        this.changeMessage();
      },
      error=>{console.log(error)}
    )
  }

  getAdvById(id)
  {
    this.service.getAdvertisementById(id)
    .subscribe(
      (data:Advertisement)=>{this.adv=data; this.isLoading=true;},
      error=>console.log(error)
    )
  }

  isMyAdv(id:Number)
  {
    this.service.isMyAdvertisement(id)
    .subscribe(
      (data:Boolean)=>{this.isUserAdv=data},
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
