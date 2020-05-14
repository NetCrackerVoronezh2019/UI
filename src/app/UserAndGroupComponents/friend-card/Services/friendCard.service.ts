import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';

@Injectable()
export class FriendCardService
{
    constructor(private http: HttpClient, private http2: Http) {}

    addFriend(userId) {
      return this.http.put('http://localhost:9080/friend/add',null,{params: new HttpParams().set('ingoingId',userId)})
    }

    removeFriend(userId) {
      return this.http.put('http://localhost:9080/friend/remove',null,{params: new HttpParams().set('ingoingId',userId)})
    }


        downloadProfileImage(key:String): Observable<any>{
            return this.http2.get('http://localhost:1234/getuserimg/'+key, {responseType: ResponseContentType.Blob});
        }
}
