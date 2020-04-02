import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }

  subscribeGroup(groupId) {
      return this.http.post('http://localhost:9080/userAndGroup/subscribe',{groupId: groupId})
  }

  getGroup(groupId) {
    return this.http.get('http://localhost:9080/userAndGroup/getGroup',{params: new HttpParams().set('groupId',groupId)})
  }

  getThisUser() {
    return this.http.get('http://localhost:9080/userAndGroup/getThisUser')
  }

  getGroupUsers(groupId) {
    return this.http.get('http://localhost:9080/userAndGroup/getGroupUsers',{params: new HttpParams().set('groupId',groupId)})
  }

  leaveGroup(groupId) {
    return this.http.delete('http://localhost:9080/userAndGroup/leaveGroup/',{params: new HttpParams().set('groupId',groupId)})
  }

}
