import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {WebSocketService} from '../home/Services/WebSocket.Service'
import {AppService} from '../app.service'
import {interval} from 'rxjs'
import {AdvertisementService1} from '../allusers/services/advertisement.service'
import * as Webstomp from 'webstomp-client';
import {AdvNotification} from '../classes/advNotification'
import { Client} from 'webstomp-client';
import { FriendListService } from "src/app/UserAndGroupComponents/friend-list/Services/friend-list.service";
import { FriendsNotification } from "@UserAndGroupClasses/friendsNotification";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService,WebSocketService,AppService,AdvertisementService1,FriendListService]
})
export class NavbarComponent implements OnInit {


  private isLogin=false;
  private isAdmin=false
  private UserInfo:any;
  private OnlineSubscription:any;
  private serverUrl = 'ws://localhost:9080/socket/websocket'
  private stompClient1:Client;
  private stompClient2:Client;
  private stompClient3:Client;
  private stompClient4:Client;
  private count="";
  private countNot:String="0"
  private friendsNot=""
  private groupsNot=""
  notificationsClick=false;
  private notifications:AdvNotification[];
  private friendsNotifications:FriendsNotification[];

  constructor(private authService:AuthService, private appService:AppService,
    private wsService:WebSocketService,private advService:AdvertisementService1,private friendService:FriendListService) { }


    initializeWebSocketConnection(userId:Number){
      const websocket1: WebSocket = new WebSocket(this.serverUrl);
      const websocket2: WebSocket = new WebSocket(this.serverUrl);
      const websocket3: WebSocket = new WebSocket(this.serverUrl);
      const websocket4: WebSocket = new WebSocket(this.serverUrl);
      this.stompClient1 = Webstomp.over(websocket1);
      this.stompClient2 = Webstomp.over(websocket2);
      this.stompClient3 = Webstomp.over(websocket3);
      this.stompClient4 = Webstomp.over(websocket4);

      this.stompClient1.connect({ login: null, passcode: null }, () => {
            this.stompClient1.subscribe("/notificationCount/" + userId, (message) => {
              this.count=JSON.parse(message.body);
            });
        });

        this.stompClient2.connect({ login: null, passcode: null }, () => {
          this.stompClient2.subscribe("/notification/"+userId, (message) => {
            this.countNot=JSON.parse(message.body);
          });

      });

      this.stompClient3.connect({ login: null, passcode: null }, () => {
        this.stompClient3.subscribe("/friends/"+userId, (message) => {
          this.friendsNot=JSON.parse(message.body);
          this.getFriendsNot();
        });
      });

      this.stompClient4.connect({ login: null, passcode: null }, () => {
        this.stompClient4.subscribe("/groupsNot/"+userId, (message) => {
        this.groupsNot=JSON.parse(message.body);
      });
    });


    }

    closeWebSocketConection() {
      this.stompClient1.disconnect();
      this.stompClient2.disconnect();
      this.stompClient3.disconnect();
      this.stompClient4.disconnect();
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

    getFriendsNotifications() {
      this.wsService.getFriendsNotificationCount().subscribe((data:string) => {
        this.friendsNot = data;
      })
    }

    getGroupNotifications() {
      this.wsService.getGroupNotificationsCount().subscribe((data:string) => {
        this.groupsNot = data;
      });
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
           this.initializeWebSocketConnection(this.UserInfo.userId);
           this.setOnline();
           this.getMyNotificationsSize();
           this.getFriendsNotifications();
           this.getGroupNotifications();
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
        console.log("notifications");
        console.log(this.notifications);
        this.notificationsClick=true;
        this.advService.setAllNotificationasReaded()
        .subscribe(data=>{},
                  error=>console.log(error))
      },
       error=>console.log(error)
    )
  }

  getFriendsNot() {
    this.friendService.getNotifications().subscribe((data:FriendsNotification[]) => {
      this.friendsNotifications = data;
      console.log(data);
    })
  }

  deleteFriendsNot(index) {
    this.friendsNotifications.splice(index,1);
    this.getFriendsNotifications();
  }

}
