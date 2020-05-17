import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';
import {AppProperties} from 'src/app/appProperties'

@Injectable()
export class FriendCardService
{
    constructor(private http: HttpClient, private http2: Http) {}

    addFriend(userId) {
      return this.http.put(AppProperties.ip+':9080/friend/add',null,{params: new HttpParams().set('ingoingId',userId)})
    }

    removeFriend(userId) {
      return this.http.put(AppProperties.ip+':9080/friend/remove',null,{params: new HttpParams().set('ingoingId',userId)})
    }


        downloadProfileImage(key:String): Observable<any>{
            return this.http2.get(AppProperties.ip+':1234/getuserimg/'+key, {responseType: ResponseContentType.Blob});
        }
}
