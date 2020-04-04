import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import {UserAdvertisementInfo} from '../../classes/userNotificationInfo'
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {AdvertisementService1} from '../services/advertisement.service';
import {AdvertisementService} from '../../student/services/advertisement.service'
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers:[AdvertisementService1,AdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  private serverUrl = 'ws://localhost:9080/socket/websocket'
  private stompClient:Client;
  id:Number;
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
        this.isMyAdv(this.id);
        this.canSendRequest();
      } 
    );

    this.initializeWebSocketConnection();
}

initializeWebSocketConnection(){
  const websocket: WebSocket = new WebSocket(this.serverUrl);
  this.stompClient = Webstomp.over(websocket);
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
    this.service.sendNotification(this.adv)
    .subscribe(
      (data)=>{this.message="Всё прошло успешно !", this.canSendRequest(); this.buttonHidden=false},
      error=>{this.message="Ошибка при отправке"; this.buttonHidden=false}
      )
  }  

  sendNotificationSocket()
  {
    this.stompClient.send("/sendNotification/" , JSON.stringify({
            addresseeId:this.adv.authorId,
            advertisementId:this.adv.advertisementId,
            type:'TAKE_ADVERTISEMENT',
            advertisementName:this.adv.advertisementName
    }));
    this.canSendRequest(); 
    this.message="Всё прошло успешно !"
    this.buttonHidden=false;
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
