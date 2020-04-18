import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class DialogsListService
{
    constructor(private http: HttpClient, private fb:FormBuilder) {}

    dialogCreationForm=this.fb.group(
            {
                "dialogName":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
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

    getUser() {
      return this.http.get('http://localhost:9080/userAndGroup/getThisUser')
      }
    getUserDialogs() {
        return this.http.get('http://localhost:9080/user/getUserDialogs/',
                            {params:new HttpParams()});
      }

    getDialogCreationForm(): FormGroup  {
       return this.dialogCreationForm;
      }

   CreateDialog(){
     const body = {
                       name: this.dialogCreationForm.value.dialogName
                   };
        this.dialogCreationForm.value.dialogName = "";
        return this.http.post('http://localhost:9080/user/dialogCreate/',body);
    }

    getUserDialogsByType(type) {
        return this.http.get('http://localhost:9080/user/getUserDialogs/',
                            {params:new HttpParams().set("type",type)});
      }


    startDialogWithUser(userId) {
        return this.http.post('http://localhost:9080/users/startDialog',null,{params:new HttpParams().set("userId",userId)})
    }

    getFriends() {
      return this.http.get('http://localhost:9080/thisUser/friends')
    }

    search() {
      return this.http.get('http://localhost:9080/users/search',{params: new HttpParams().set("firstName",this.userSearchForm.value.firstName)
                                                                                                  .set("lastName",this.userSearchForm.value.lastName)})
    }

}
