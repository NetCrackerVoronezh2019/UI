import { FormGroup, FormControl,Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService
{
    constructor(private http: HttpClient, private fb:FormBuilder) {}

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

          addUserInDialog(dialogId:string) {
            return this.http.get('http://localhost:9080/user/addUserInDialog/',{params:new HttpParams().set('dialogId',dialogId).set('userName', this.addUserForm.value.userName)})
          }
}
