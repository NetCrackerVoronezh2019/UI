import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {WebSocketService} from '../home/Services/WebSocket.Service'
import {AppService} from '../app.service'
import {interval} from 'rxjs'
import {AdvertisementService1} from '../allusers/services/advertisement.service'
import * as Webstomp from 'webstomp-client';
import {AdvNotification} from '../classes/advNotification'
import { Client} from 'webstomp-client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService,WebSocketService,AppService,AdvertisementService1]
})
export class NavbarComponent implements OnInit {

  
  private isLogin=false;
  private isAdmin=false
  private UserInfo:any;
  private OnlineSubscription:any;
  private serverUrl = 'ws://localhost:9080/socket/websocket'
  private stompClient1:Client;
  private stompClient2:Client;
  private count="";
  private countNot:String="0"
  private notifications:AdvNotification[];

  constructor(private authService:AuthService, private appService:AppService,
    private wsService:WebSocketService,private advService:AdvertisementService1) { }


    initializeWebSocketConnection(userName:String,userId:Number){
      const websocket1: WebSocket = new WebSocket(this.serverUrl);
      const websocket2: WebSocket = new WebSocket(this.serverUrl);
      this.stompClient1 = Webstomp.over(websocket1);
      this.stompClient2 = Webstomp.over(websocket2);
      
      this.stompClient1.connect({ login: null, passcode: null }, () => {
            this.stompClient1.subscribe("/notificationCount/" + userName, (message) => {
              this.count=JSON.parse(message.body);
            });
        });

        this.stompClient2.connect({ login: null, passcode: null }, () => {
          this.stompClient2.subscribe("/notification/"+userId, (message) => {
            this.countNot=JSON.parse(message.body);
          });
          
      });
      
      
    }

    closeWebSocketConection() {
      this.stompClient1.disconnect();
      this.stompClient2.disconnect();
    }

    getMessageNotificationCount()
    {
      this.wsService.getMessageNotificationCount()
      .subscribe
      (
        (data:any)=>{this.count=data},
        (error)=>console.log(error)
      )
    }

  ngOnInit() {
     this.authService.isLogin().
     subscribe(
       (data:any)=>{
         if(data!=undefined)
         {
          this.getMessageNotificationCount();
           this.isLogin=true;
           this.UserInfo=data;
           if(this.UserInfo.roleName=="ROLE_ADMIN")
              this.isAdmin=true;
           this.initializeWebSocketConnection(this.UserInfo.userName,this.UserInfo.userId);
           this.setOnline();
           this.getMyNotificationsSize();
         }
       },
       err=>{}
     )
  }


  getMyNotificationsSize()
  {
    this.advService.getMyNotificationsSize()
    .subscribe(
      (data:String)=>this.countNot=data,
      error=>console.log(error)
    )
  }
  Logout()
  {
    localStorage.removeItem('token');
    this.isLogin=false;
    this.isAdmin=false;
    this.UserInfo=undefined;
    this.closeWebSocketConection();
  }

  setOnline()
  {

   if(this.isLogin)
   { 
      this.OnlineSubscription=interval(1*60000).subscribe(()=>{this.appService.sendOnlineRequest()
        .subscribe(
            (data)=>console.log(data),
            (error)=>{}
          )}
        )
   }
  }

  ngOnDestroy()
  {
    if(this.OnlineSubscription!=undefined)
      this.OnlineSubscription.unsubscribe();
  }

  getMyAllNotifications()
  {
    this.advService.getMyNotifications()
    .subscribe(
      (data:AdvNotification[])=>
      {
        this.notifications=data;
        this.advService.setAllNotificationasReaded()
        .subscribe(data=>{},
                  error=>console.log(error))
      },
       error=>console.log(error)
    )
  }

}
