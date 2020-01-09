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


    getUser(userId:string) {
      return this.http.get('http://localhost:8080/getUser',
                          {params:new HttpParams().set('userId',userId)});
      }
    getUserDialogs(userId:string) {
        return this.http.get('http://localhost:8080//getUserDialogs',
                            {params:new HttpParams().set('userId',userId)});
      }

    getDialogCreationForm(): FormGroup  {
       return this.dialogCreationForm;
      }

   CreateDialog(creatorId){
     const body = {
                       name: this.dialogCreationForm.value.dialogName,
                       creatorId: creatorId
                   };
        this.http.post('http://localhost:8080/dialogCreate',body).
                    subscribe(
                      data => {
                        console.log(data);
                        return this.getUserDialogs(creatorId);
                      },
					            error => console.log(error)
                    );
    }
}
