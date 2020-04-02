import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()

export class SignInService
{
    constructor(private fb:FormBuilder,private http: HttpClient) {}
    signInForm=this.fb.group(
        {
            "userEmail": [""],
            "userPassword":[""]
        }
    );
    getSignInForm(){
        return this.signInForm;
    }

   sendData()
   {
	   let body={
				email:this.signInForm.value.userEmail,
				password:this.signInForm.value.userPassword
			};

        return this.http.post('http://localhost:9080/signIn',body);
   }





}
