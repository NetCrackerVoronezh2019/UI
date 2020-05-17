import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import {AppProperties} from 'src/app/appProperties'

@Injectable()

export class RoleService
{

    baseUrl:String=AppProperties.ip+':9080/admin';
    constructor(private http:HttpClient,private fb:FormBuilder){}

    roleForm=this.fb.group(
        {  
            "roleName": [""]
        } 
    );
    
    getRoleForm()
    {
        return this.roleForm;
    }
    getRoles(){
        return this.http.get(this.baseUrl+'/getAllRoles');
    }

    sendRoleName()
    {
        let body={
            roleName:this.roleForm.value.roleName
        }

      return  this.http.post(this.baseUrl+"/setRoles",body);
    }
}