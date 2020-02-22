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
                "userName":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
            }
          )


    getDialogMembers(dialogId:string) {
        return this.http.get('http://localhost:8080/getDialogMembers',
                            {params:new HttpParams().set('dialogId',dialogId)});
      }

      getDialogMessages(dialogId:string) {
        return this.http.get('http://localhost:8080/getDialogMessages',
                              {params:new HttpParams().set('dialogId',dialogId)});
      }

      getDialogInfo(dialogId:string) {
        return this.http.get('http://localhost:8080/getDialog',
                              {params:new HttpParams().set('dialogId',dialogId)});
      }

      getMessageForm(): FormGroup  {
         return this.messageForm;
        }
      getAddUserForm(): FormGroup  {
          return this.addUserForm;
        }

        getUser(userId:string) {
          return this.http.get('http://localhost:8080/getUser',
                              {params:new HttpParams().set('userId',userId)});
          }

          deleteDialog(dialogId:string) {
            return this.http.delete('http://localhost:8080/deleteDialog',
                              {params:new HttpParams().set('dialogId',dialogId)})
          }

          liveDialog(dialogId:string, userId:string) {
            return this.http.delete('http://localhost:8080/liveDialog',
                              {params:new HttpParams().set('dialogId',dialogId).set('userId', userId)})
          }

          addUserInDialog(dialogId:string) {
            return this.http.get('http://localhost:8080/addUserInDialog',{params:new HttpParams().set('dialogId',dialogId).set('userName', this.addUserForm.value.userName)})
          }


}
