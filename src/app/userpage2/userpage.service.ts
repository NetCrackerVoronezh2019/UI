import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';
import {File} from '../classes/file'
import {AdvNotification} from '../classes/advNotification'


@Injectable()

export class UserPageService
{
    constructor(private fb:FormBuilder,private http: HttpClient,private http2: Http) {}

    getUserData(id:Number)
    {
        return this.http.get('http://localhost:9080/getUser/'+id);
    }


    getOrders(id:Number)
    {
        return this.http.get('http://localhost:1122/getFreelancerOrders/'+id)
    }

    getAllAdvertisements(id:Number)
    {
        return this.http.get('http://localhost:1122/myAdvertisements/'+id)
    }


    getMyId()
    {
        return this.http.get('http://localhost:9080/getMyId');
    }


    updateImage(file:File)
    {

        console.log(file);
      return this.http.post("http://localhost:9080/user/updateUserImage",file);
    }


    downloadFile(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getCertFile/'+key, {responseType: ResponseContentType.Blob});
    }

    downloadProfileImage(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getuserimg/'+key, {responseType: ResponseContentType.Blob});
    }

    getNotifications(id)
    {
      return this.http.get('http://localhost:9080/getCommonNots/'+id);
    }

    startDialogWithUser(userId) {
        return this.http.post('http://localhost:9080/users/startDialog',null,{params:new HttpParams().set("userId",userId)})
    }

    getFeedBack(id)
    {
      return this.http.get('http://localhost:9080/getFreelancerAllFeedBack/'+id);
    }

    getYourFriends() {
      return this.http.get('http://localhost:9080/thisUser/friends')
    }

    getYourOutgoing() {
      return this.http.get('http://localhost:9080/thisUser/outgoingFriends')
    }

    getYourIngoing() {
      return this.http.get('http://localhost:9080/thisUser/ingoingFriends')
    }

    addFriend(userId) {
      return this.http.put('http://localhost:9080/friend/add',null,{params: new HttpParams().set('ingoingId',userId)})
    }

    removeFriend(userId) {
      return this.http.put('http://localhost:9080/friend/remove',null,{params: new HttpParams().set('ingoingId',userId)})
    }

    getUserGroups(userId) {
      return this.http.get('http://localhost:9080/groups/getUserGroups',{params: new HttpParams().set('userId',userId)})
    }

    getFriends(userId) {
      return this.http.get('http://localhost:9080/user/friends',{params: new HttpParams().set('userId',userId)})
    }
}
