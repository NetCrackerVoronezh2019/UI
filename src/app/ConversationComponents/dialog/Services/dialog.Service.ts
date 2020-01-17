import { FormGroup, FormControl, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService
{
    constructor(private http: HttpClient, private fb:FormBuilder) {}

    messageForm=this.fb.group(
            {
                "text":[""]
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

        getUser(userId:string) {
          return this.http.get('http://localhost:8080/getUser',
                              {params:new HttpParams().set('userId',userId)});
          }
}