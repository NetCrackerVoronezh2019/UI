import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getThisUser() {
    return this.http.get('http://localhost:9080/userAndGroup/getThisUser')
  }

  getUser(userId) {
    return this.http.get('http://localhost:9080/userAndGroup/getUser',{params: new HttpParams().set('userId',userId)})
  }

  getUserGroups(userId) {
    return this.http.get('http://localhost:9080/groups/getUserGroups',{params: new HttpParams().set('userId',userId)})
  }

  getFriends(userId) {
    return this.http.get('http://localhost:9080/user/friends',{params: new HttpParams().set('userId',userId)})
  }
}
