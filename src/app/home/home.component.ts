import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {WebSocketService} from './Services/WebSocket.Service'
import {of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[WebSocketService]
})
export class HomeComponent implements OnInit {

  isLogin=false;
  isAdmin=false;
  UserInfo:any;
  constructor(private authService:AuthService, private wsService:WebSocketService) { }

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
}
