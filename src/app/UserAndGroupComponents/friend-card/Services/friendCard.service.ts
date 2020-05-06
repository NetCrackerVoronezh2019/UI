import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class FriendCardService
{
    constructor(private http: HttpClient) {}

    addFriend(userId) {
      return this.http.put('http://localhost:9080/friend/add',null,{params: new HttpParams().set('ingoingId',userId)})
    }

    removeFriend(userId) {
      return this.http.put('http://localhost:9080/friend/remove',null,{params: new HttpParams().set('ingoingId',userId)})
    }
}
