import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {WebSocketService} from '../home/Services/WebSocket.Service'
import {AppService} from '../app.service'
import {interval} from 'rxjs'
import {AdvertisementService1} from '../allusers/services/advertisement.service'
import * as Webstomp from 'webstomp-client';
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
  private notificationsClick=false;
  private UserInfo:any;
  private OnlineSubscription:any;
  private serverUrl = 'ws://localhost:9080/socket/websocket'
  private stompClient:Client;
  private count="";
  private countNot:String="0"
  constructor(private authService:AuthService, private appService:AppService,
    private wsService:WebSocketService,private advService:AdvertisementService1) { }


    initializeWebSocketConnection(userName:String,userId:Number){
      const websocket: WebSocket = new WebSocket(this.serverUrl);
      this.stompClient = Webstomp.over(websocket);
      
      this.stompClient.connect({ login: null, passcode: null }, () => {
            this.stompClient.subscribe("/notificationCount/" + userName, (message) => {
              this.count=JSON.parse(message.body);
            });
        });

        this.stompClient.connect({ login: null, passcode: null }, () => {
          this.stompClient.subscribe("/notification/"+userId, (message) => {
            this.countNot=JSON.parse(message.body);
          });
      });
      
    }

    closeWebSocketConection() {
      this.stompClient.disconnect();
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

  getNot()
  {
    this.notificationsClick=true;
  }

  getNot2()
  {
    this.notificationsClick=false;
  }
}
