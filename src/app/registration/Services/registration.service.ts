import { FormGroup, FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RegistrationService
{
    constructor(private fb:FormBuilder,private http: HttpClient) {}
        myForm=this.fb.group(
            {
                "userName":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
                "userSurname":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
                "userEmail": ["",[Validators.required,Validators.email]],
				"Passwords":this.fb.group({
					            "password":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
								"confirmPassword":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
								 },{validator:this.ConfirmPasswordValidator})
            }
            
        );
    		
		ConfirmPasswordValidator(control: AbstractControl){

            const password=control.get("password");
            const confirmPassword=control.get("confirmPassword");
            if(password.value!=confirmPassword.value){		 
                confirmPassword.setErrors({confirm: true });
                }    
            else {
                    confirmPassword.setErrors(null);
                }
    }

    getRegForm(): FormGroup  {
        return this.myForm;
    }

    postData(){
         
        const body = {
                        name:this.myForm.value.userName, 
                        surname: this.myForm.value.userSurname
                    };
                    
        console.log(body);
         this.http.post('http://localhost:8080/angular',body)
				  .subscribe(
                    data => console.log(data),
										error => console.log(error)
                );
    }
}