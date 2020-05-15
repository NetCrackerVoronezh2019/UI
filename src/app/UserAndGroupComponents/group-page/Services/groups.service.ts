import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient, private fb:FormBuilder, private http2: Http) { }

  groupSettingsForm=this.fb.group(
          {
              "groupSection":[""],
              "groupName":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
          }
        )

  userSearchForm=this.fb.group(
      {
          "firstName":["",[Validators.maxLength(15)]],
          "lastName":["",[Validators.maxLength(15)]]
        }
    )

    postCreatForm=this.fb.group(
      {
        "text":["",[Validators.minLength(10)]]
      }
    )

    getPostCreateForm() {
      return this.postCreatForm
    }

    getUserSearchForm() {
      return this.userSearchForm
    }


    getGroupSettingsForm() {
      return this.groupSettingsForm
    }

  subscribeGroup(groupId) {
      return this.http.post('http://95.30.222.140:9080/userAndGroup/subscribe',{groupId: groupId})
  }

  getGroup(groupId) {
    return this.http.get('http://95.30.222.140:9080/userAndGroup/getGroup',{params: new HttpParams().set('groupId',groupId)})
  }

  getThisUser() {
    return this.http.get('http://95.30.222.140:9080/userAndGroup/getThisUser')
  }

  getGroupUsers(groupId) {
    return this.http.get('http://95.30.222.140:9080/userAndGroup/getGroupUsers',{params: new HttpParams().set('groupId',groupId)})
  }

  leaveGroup(groupId) {
    return this.http.delete('http://95.30.222.140:9080/userAndGroup/leaveGroup/',{params: new HttpParams().set('groupId',groupId)})
  }

  getUserGroups() {
      return this.http.get('http://95.30.222.140:9080/groups/getThisUserGroups',
                          {params:new HttpParams()});
    }

    getAdmins(groupId) {
      return this.http.get('http://95.30.222.140:9080/groups/admins',{params: new HttpParams().set('groupId',groupId)})
    }

    getAllSubjects() {
      return this.http.get('http://95.30.222.140:9080/groups/getAllSubjects')
    }

    groupSettingsAccept(groupId) {
      const body = {
        groupId: groupId,
        name:this.groupSettingsForm.value.groupName,
        subjectName: this.groupSettingsForm.value.groupSection
      }
      return this.http.put('http://95.30.222.140:9080/groups/settings',body)
    }

    searchUsers(groupId) {
      return this.http.get('http://95.30.222.140:9080/group/searchUsers',{params: new HttpParams().set('groupId', groupId)
                                .set('firstName',this.userSearchForm.value.firstName).set('lastName',this.userSearchForm.value.lastName)})
    }

    makeAdmin(groupId,userId) {
      return this.http.put('http://95.30.222.140:9080/groups/makeAdmin',null,{params: new HttpParams().set('groupId',groupId).set('userId',userId)})
    }

    deleteAdmin(groupId,userId) {
      return this.http.put('http://95.30.222.140:9080/groups/deleteAdmin',null,{params: new HttpParams().set('groupId',groupId).set('userId',userId)})
    }

    getGroupPosts(groupId) {
      return this.http.get('http://95.30.222.140:9080/groups/getPosts',{params:new HttpParams().set('groupId',groupId)})
    }

    sendPost(groupId,allFiles) {
      const body = {
        text: this.postCreatForm.value.text,
        groupId:groupId,
        images:allFiles
      }
      return this.http.post('http://95.30.222.140:9080/groups/makePost',body)
    }

    setAvatar(groupId,image) {
      const body = {
        groupId: groupId,
        image:image
      }
      return this.http.put('http://95.30.222.140:9080/group/setAvatar',body)
    }

    downloadGroupImage(key:String): Observable<any>{
        return this.http2.get('http://95.30.222.140:1234/getGroupImg/'+key, {responseType: ResponseContentType.Blob});
    }

    notificationOn(groupId) {
      return this.http.put('http://95.30.222.140:9080/group/notificationsOn',null,{params: new HttpParams().set("groupId",groupId)})
    }

    notificationOff(groupId) {
      return this.http.put('http://95.30.222.140:9080/group/notificationsOff',null,{params: new HttpParams().set("groupId",groupId)})
    }

    cleanNotifications(groupId) {
      return this.http.delete('http://95.30.222.140:9080/group/cleanNotifications',{params: new HttpParams().set('groupId',groupId)})
    }
}
