import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class MyAdvService
{
    constructor(private fb:FormBuilder,private http: HttpClient) {}
     myAdvForm=this.fb.group(
        {  
            "advStatus":[],
        })  



    getMyAdvForm()
    {
        return this.myAdvForm;
    }

    getFormInfo()
    {
        console.log(this.myAdvForm.value.advStatus);
    }

    getAdvertisementsByStatus()
    {
        let status=this.myAdvForm.value.advStatus;
        return this.http.get("http://localhost:1122/student/getadvertisement/34/"+status);
    }


}