import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient, private fb:FormBuilder) { }

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

    getUserSearchForm() {
      return this.userSearchForm
    }


    getGroupSettingsForm() {
      return this.groupSettingsForm
    }

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

  getUserGroups() {
      return this.http.get('http://localhost:9080/groups/getThisUserGroups',
                          {params:new HttpParams()});
    }

    getAdmins(groupId) {
      return this.http.get('http://localhost:9080/groups/admins',{params: new HttpParams().set('groupId',groupId)})
    }

    getAllSubjects() {
      return this.http.get('http://localhost:9080/groups/getAllSubjects')
    }

    groupSettingsAccept(groupId) {
      const body = {
        groupId: groupId,
        name:this.groupSettingsForm.value.groupName,
        subjectName: this.groupSettingsForm.value.groupSection
      }
      return this.http.put('http://localhost:9080/groups/settings',body)
    }

    searchUsers(groupId) {
      return this.http.get('http://localhost:9080/group/searchUsers',{params: new HttpParams().set('groupId', groupId)
                                .set('firstName',this.userSearchForm.value.firstName).set('lastName',this.userSearchForm.value.lastName)})
    }

    makeAdmin(groupId,userId) {
      return this.http.put('http://localhost:9080/groups/makeAdmin',null,{params: new HttpParams().set('groupId',groupId).set('userId',userId)})
    }

    deleteAdmin(groupId,userId) {
      return this.http.put('http://localhost:9080/groups/deleteAdmin',null,{params: new HttpParams().set('groupId',groupId).set('userId',userId)})
    }

}
