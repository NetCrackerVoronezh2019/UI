import { FormGroup, FormArray,FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CertificateFile} from '../../classes/certificateFile'
@Injectable()
export class RegistrationService
{
    baseUrl:String='http://localhost:9080';
    constructor(private fb:FormBuilder,private http: HttpClient) {}
        myForm=this.fb.group(
            {
                "userName":["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
                "userSurname":["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
                "userEmail": ["",[Validators.required,Validators.email]],
                "userImg":[""],
                "education":[null],
                "aboutMe":[""],
                "gender":[""],
                "birthDate":[""],
				"Passwords":this.fb.group({
					            "password":["",[Validators.required,Validators.minLength(0),Validators.maxLength(15)]],
								"confirmPassword":["",[Validators.required,Validators.minLength(0),Validators.maxLength(15)]]
                                 },{validator:this.ConfirmPasswordValidator}),
                "certificateFiles":new FormArray([
                    new FormControl(new CertificateFile())
                ])
            }
            
        );

        addSection(){
            let file=new CertificateFile();
            (<FormArray>this.myForm.controls["certificateFiles"]).push(new FormControl(file));
        }
    		
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


    checkEmail()
    {
        let email=this.myForm.value.userEmail;
        return this.http.get(this.baseUrl+'/checkEmail/'+email);
    }
    sendRegistrationInformation(role:any,certificateFiles){
         
        const body = {
                        firstname:this.myForm.value.userName, 
                        lastname: this.myForm.value.userSurname,
                        email:this.myForm.value.userEmail,
                        password:this.myForm.value.Passwords.password,
                        role:role,
                        certificateFiles,
                        birthDate:this.myForm.value.birthDate,
                        gender:this.myForm.value.gender,
                        aboutMe:this.myForm.value.aboutMe,
                        education:null
                        //education:this.myForm.value.education
                    };
        console.log(body);
        
       return  this.http.post(this.baseUrl+'/registration',body);
				 
    }

    

    getSubjects()
    {
        return this.http.get(this.baseUrl+"/getAllSubjects");
    }
    
}