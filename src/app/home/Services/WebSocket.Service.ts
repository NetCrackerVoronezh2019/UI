import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';

@Injectable()
export class WebSocketService
{
    constructor(private http: HttpClient) {}

    private serverUrl = 'ws://localhost:9080/socket/websocket'
    private stompClient:Client;

    initializeWebSocketConnection(userName:String){
      const websocket: WebSocket = new WebSocket(this.serverUrl);
      this.stompClient = Webstomp.over(websocket);
      this.stompClient.connect({ login: null, passcode: null }, () => {
            this.stompClient.subscribe("/notification/" + userName, (message) => {
              console.log(JSON.parse(message.body));
            });
        });
    }

    closeWebSocketConection() {
      this.stompClient.disconnect();
    }
}
