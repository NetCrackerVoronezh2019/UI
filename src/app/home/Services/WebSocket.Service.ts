import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';

@Injectable()
export class WebSocketService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http: HttpClient) {}


    getMessageNotificationCount()
    {
        return this.http.get(this.baseUrl+"/user/getMessageNotificationCount");
    }

    
}
