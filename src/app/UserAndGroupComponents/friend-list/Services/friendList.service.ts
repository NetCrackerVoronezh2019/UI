import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class FriendListService
{
    constructor(private http: HttpClient, private fb:FormBuilder) {}

    userSearchPanel=this.fb.group(
            {
                "firstName":["",[Validators.maxLength(15)]],
                "lastName":["",[Validators.maxLength(15)]]
            }
        )



    getUser() {
      return this.http.get('http://localhost:9080/userAndGroup/getThisUser',
                          {params:new HttpParams()});
      }

    getUserSearchPanel():FormGroup {
      return this.userSearchPanel;
    }

    getFriends() {
      return this.http.get('http://localhost:9080/thisUser/friends')
    }

    getOutgoing() {
      return this.http.get('http://localhost:9080/thisUser/outgoingFriends')
    }

    getIngoing() {
      return this.http.get('http://localhost:9080/thisUser/ingoingFriends')
    }

    search() {
      return this.http.get('http://localhost:9080/users/search',{params: new HttpParams().set("firstName",this.userSearchPanel.value.firstName)
                                                                                                  .set("lastName",this.userSearchPanel.value.lastName)})
    }

    deleteNotifications() {
      return this.http.delete('http://localhost:9080/user/cleanNotifications')
    }

    ignoreNotification(notificationId) {
      return this.http.delete('http://localhost:9080/user/ignoreNotifications',{params: new HttpParams().set("notificationId",notificationId)})
    }

    getNotifications() {
      return this.http.get('http://localhost:9080/user/friendshipNotifications')
    }

    addFriend(userId) {
      return this.http.put('http://localhost:9080/friend/add',null,{params: new HttpParams().set('ingoingId',userId)})
    }
}
