import { FormGroup, FormControl,Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';

@Injectable()
export class DialogService
{
    constructor(private http: HttpClient, private fb:FormBuilder,  private http2: Http) {}

    messageForm=this.fb.group(
            {
                "text":["",[Validators.required,Validators.minLength(1)]]
            }
          )
    addUserForm=this.fb.group(
            {
                "userName":["",[Validators.required,Validators.minLength(5),Validators.maxLength(20)]]
            }
          )


    userSearchForm=this.fb.group(
        {
            "firstName":["",[Validators.maxLength(15)]],
            "lastName":["",[Validators.maxLength(15)]]
          }
      )

      dialogSettingsForm=this.fb.group(
              {
                  "name":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
              }
            )

      getDialogSettingsForm() {
        return this.dialogSettingsForm;
      }


      getUserSearchForm() {
        return this.userSearchForm
      }

    getDialogMembers(dialogId:string) {
        return this.http.get('http://localhost:9080/user/getDialogMembers/',
                            {params:new HttpParams().set('dialogId',dialogId)});
      }

      getDialogMessages(dialogId:string) {
        return this.http.get('http://localhost:9080/user/getDialogMessages/',
                              {params:new HttpParams().set('dialogId',dialogId)});
      }

      getDialogInfo(dialogId:string) {
        return this.http.get('http://localhost:9080/user/getDialog/',
                              {params:new HttpParams().set('dialogId',dialogId)});
      }

      getMessageForm(): FormGroup  {
         return this.messageForm;
        }
      getAddUserForm(): FormGroup  {
          return this.addUserForm;
        }

        getUser() {
          return this.http.get('http://localhost:9080/user/getUser/',
                              {params:new HttpParams()});
          }

          deleteDialog(dialogId:string) {
            return this.http.delete('http://localhost:9080/user/deleteDialog/',
                              {params:new HttpParams().set('dialogId',dialogId)})
          }

          liveDialog(dialogId:string) {
            return this.http.delete('http://localhost:9080/user/liveDialog/',
                              {params:new HttpParams().set('dialogId',dialogId)})
          }

          addUserInDialog(dialogId:string,userId) {
            return this.http.get('http://localhost:9080/user/addUserInDialog/',{params:new HttpParams().set('dialogId',dialogId).set('userId', userId)})
          }

          getNotifications(dialogId) {
            return this.http.get('http://localhost:9080/dialog/getNotification',{params:new HttpParams().set('dialogId',dialogId)})
          }

          getFriends() {
            return this.http.get('http://localhost:9080/thisUser/friends')
          }

          search() {
            return this.http.get('http://localhost:9080/users/search',{params: new HttpParams().set("firstName",this.userSearchForm.value.firstName)
                                                                                                        .set("lastName",this.userSearchForm.value.lastName)})
          }

          downloadDialogFile(key:String): Observable<any>{
              return this.http2.get('http://localhost:1234/getDialogFile/'+key, {responseType: ResponseContentType.Blob});
          }

        submitSettings(dialogId) {
          const body = {
            dialogId: dialogId,
            name: this.dialogSettingsForm.value.name
          }
          return this.http.put('http://localhost:9080/dialog/settings',body)
        }

        submitAvatar(dialogId,avatar) {
          const body = {
            dialogId: dialogId,
            image : avatar
          }
          return this.http.put('http://localhost:9080/dialog/setAvatar',body)
        }

        sendMessage(user,dialogId,files,names) {
          const body = {
            text: this.messageForm.value.text,
            sender: user,
            dialog: dialogId,
            files : files,
            names: names
          }
          return this.http.post('http://localhost:9080/sendMessage/',body)
        }

        downloadProfileImage(key:String): Observable<any>{
            return this.http2.get('http://localhost:1234/getuserimg/'+key, {responseType: ResponseContentType.Blob});
        }
}
