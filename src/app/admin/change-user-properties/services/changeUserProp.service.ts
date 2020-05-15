import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable()

export class ChangeUserProp
{
    baseUrl:String='http://95.30.222.140:9080/admin';
    constructor(private fb:FormBuilder,private http:HttpClient){}
    EditForm=this.fb.group(
        {
            "userId":[""],
            "userFirstname":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
            "userLastname":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
            "userEmail": ["",[Validators.required,Validators.email]],
            "userRole":[""],
            "userIsActivate":[""],
            "userIsDeleted":[""]
        }
    );

    SearchForm=this.fb.group(
        {
            "search":[""],
            
        }
    );


   

    getEditForm(){
        return this.EditForm;
    }

    getSearchForm(){
        return this.SearchForm;
    }



    setDefaultValuesForEditForm(data)
    {
        this.EditForm.setValue({
            userId:data.userId,
            userFirstname:data.firstname,
            userLastname:data.lastname,
            userEmail:data.email,
            userRole:data.role.roleName,
            userIsActivate:data.IsActivate,
            userIsDeleted:data.isDeleted
            
         },{onlySelf:true});
         console.log(this.EditForm.value.userIsActivate);
    }

    getAllUsers()
    {
        return this.http.get(this.baseUrl+'/getAllUsers');
    }

    filterUsers(searchText:String)
    {
       
        return this.http.get(this.baseUrl+"/filterUser/"+this.SearchForm.value.search)
    }
  
    changeUserProperties()
    {
        const body={
            userId:this.EditForm.value.userId,
            firstname:this.EditForm.value.userFirstname,
            lastname:this.EditForm.value.userLastname,
            email:this.EditForm.value.userEmail,
            isActivate:this.EditForm.value.userIsActivate,
            role:this.EditForm.value.userRole,
            isDeleted:this.EditForm.value.userIsDeleted
        }

        console.log(body);
        return this.http.post(this.baseUrl+'/changeUser',body);
    }

    deleteUser(data)
    {
        const body={
            userId:data.userId
        }

        console.log(body);
        return this.http.post(this.baseUrl+'/deleteUser',body);
    }
}