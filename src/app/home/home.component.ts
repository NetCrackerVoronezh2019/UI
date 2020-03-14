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

  
  constructor(private authService:AuthService, private wsService:WebSocketService) { }

  ngOnInit() {
  }
}
