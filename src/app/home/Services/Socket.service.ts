import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Webstomp from 'webstomp-client';
import { Client} from 'webstomp-client';
import {AppProperties} from 'src/app/appProperties'

@Injectable()
export class WebSocketService
{
    baseUrl:String=AppProperties.ip+':9080';
    constructor(private http: HttpClient) {}


    getMessageNotificationCount()
    {
        return this.http.get(this.baseUrl+"/user/getMessageNotificationCount");
    }

    getFriendsNotificationCount() {
      return this.http.get(this.baseUrl+"/user/friendsNotifications")
    }

    getGroupNotificationsCount() {
      return this.http.get(this.baseUrl+"/groups/notificationsCount")
    }

}
