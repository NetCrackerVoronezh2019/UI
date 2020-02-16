import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';

@Injectable()

export class RoleService
{

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
        return this.http.get('http://localhost:8080/admin/getallroles');
    }

    sendRoleName()
    {
        let body={
            roleName:this.roleForm.value.roleName
        }

      return  this.http.post("http://localhost:8080/admin/setroles",body);

    }
}