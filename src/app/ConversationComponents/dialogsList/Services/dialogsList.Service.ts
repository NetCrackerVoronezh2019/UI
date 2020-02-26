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


    getUser() {
      return this.http.get('http://localhost:8080/student/getUser/',
                          {params:new HttpParams()});
      }
    getUserDialogs() {
        return this.http.get('http://localhost:8080/student/getUserDialogs/',
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
        return this.http.post('http://localhost:8080/student/dialogCreate/',body);
    }
}
