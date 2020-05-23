import { FormGroup, FormArray,FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CertificateFile} from '../../classes/certificateFile'
import {AppProperties} from 'src/app/appProperties'
import {User} from '../../classes/user';
@Injectable()
export class ChangeService
{
    baseUrl:String=AppProperties.ip+':9080';
    constructor(private fb:FormBuilder,private http: HttpClient) {}
        myForm=this.fb.group(
            {
                "userName":["",[Validators.required,Validators.maxLength(20)]],
                "userSurname":["",[Validators.required,Validators.maxLength(20)]],
                "userEmail": ["",[Validators.required,Validators.email]],
                "education":[null],
                "aboutMe":[""],
                "gender":["MALE"],
                "birthDate":[""],
				
            }
            
        );

        setFormValues(user:User)
        {   
            this.myForm.setValue({
               userName:user.firstname,
               userSurname:user.lastname,
               userEmail:user.email,
               education:user.educationLevel,
               aboutMe:user.aboutMe,
               gender:user.gender,
               birthDate:user.birthDate.split(' ')[0]

             },{onlySelf:true});

             //console.log(this.advertisementForm);
    
        }

        addSection(){
            let file=new CertificateFile();
            (<FormArray>this.myForm.controls["certificateFiles"]).push(new FormControl(file));
        }
            
        dateValidator(control:AbstractControl)
        {
            console.log("validator");
            let bd=control;
            console.log(bd.value)
           if( bd.value=="0012-11-11")
           {

            console.log("tut");
            this.myForm.setValue({
                birthDate:null,
             },{onlySelf:true});
           }
           else{
               console.log("is NULL");
           }
            return "11.11.11"
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
    changeInfo(userid){
         
        const body = {
                        id:userid,
                        firstname:this.myForm.value.userName, 
                        lastname: this.myForm.value.userSurname,
                        birthDate:this.myForm.value.birthDate,
                        gender:this.myForm.value.gender,
                        aboutMe:this.myForm.value.aboutMe,
                        education:null
                        //education:this.myForm.value.education
                    };
        console.log(body);
        
       return  this.http.post(this.baseUrl+'/changeInfo',body);
				 
    }

    

    getSubjects()
    {
        return this.http.get(this.baseUrl+"/getAllSubjects");
    }
    
}