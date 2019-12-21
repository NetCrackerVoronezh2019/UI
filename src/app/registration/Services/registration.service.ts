import { FormGroup, FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';

export class RegistrationService
{
    //myForm:FormGroup;

    constructor(private fb:FormBuilder) {}
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
    		
		ConfirmPasswordValidator(control: AbstractControl): {[s:string]:boolean}{
         
				
				const password=control.get("password");
				const confirmPassword=control.get("confirmPassword");
        if(password.value!=confirmPassword.value){
					 
												confirmPassword.setErrors({confirm: true });
                     
											 
        }    
				else{
					confirmPassword.setErrors(null);
				}
    }

    getRegForm(): FormGroup  {
          
        return this.myForm;
    }
}