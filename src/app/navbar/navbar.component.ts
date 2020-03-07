import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {WebSocketService} from '../home/Services/WebSocket.Service'
import {AppService} from '../app.service'
import {interval} from 'rxjs'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService,WebSocketService,AppService]
})
export class NavbarComponent implements OnInit {

  
  isLogin=false;
  isAdmin=false;
  UserInfo:any;
  OnlineSubscription:any;
  constructor(private authService:AuthService, private appService:AppService,private wsService:WebSocketService) { }

  ngOnInit() {
     this.authService.isLogin().
     subscribe(
       (data:any)=>{
         if(data!=undefined)
         {
           this.isLogin=true;
           this.UserInfo=data;
           if(this.UserInfo.roleName=="ROLE_ADMIN")
              this.isAdmin=true;
           console.log(this.UserInfo);
           this.wsService.initializeWebSocketConnection(this.UserInfo.userName);
          this.setOnline();

         }
       },
       err=>console.log(err)
     )
  }

  Logout()
  {
    localStorage.removeItem('token');
    this.isLogin=false;
    this.isAdmin=false;
    this.UserInfo=undefined;
    this.wsService.closeWebSocketConection();
  }

  setOnline()
  {

   if(this.isLogin)
   { 
      this.OnlineSubscription=interval(1*60000).subscribe(()=>{this.appService.sendOnlineRequest()
        .subscribe(
            (data)=>console.log(data),
            (error)=>console.log(error)
          )}
        )
   }
   
    

  }

  ngOnDestroy()
  {
   
    this.OnlineSubscription.unsubscribe();
  }
}
