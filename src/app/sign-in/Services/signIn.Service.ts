import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Http, ResponseContentType} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppProperties} from 'src/app/appProperties'

@Injectable()

export class SignInService
{
    constructor(private fb:FormBuilder,private http2: HttpClient,private http: Http) {}
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

        return this.http2.post(AppProperties.ip+':9080/signIn',body);
   }

   downloadFile(): Observable<any>{
    return this.http.get(AppProperties.ip+':1234/getCertFile/user132_certification0', {responseType: ResponseContentType.Blob});
}
   

}
