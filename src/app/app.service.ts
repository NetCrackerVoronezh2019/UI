import { HttpClient, HttpSentEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppProperties} from 'src/app/appProperties'


@Injectable()
export class AppService
{
    constructor(private http:HttpClient){}


    sendOnlineRequest()
    {
        return this.http.get(AppProperties.ip + ":9080/isOnline");
    }
}
