import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';

@Injectable()
export class WebSocketService
{
    constructor(private http: HttpClient) {}


    getMessageNotificationCount()
    {
        return this.http.get("http://localhost:9080/student/getmessagenotificationcount");
    }

    
}
