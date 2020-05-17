import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppProperties} from 'src/app/appProperties'



@Injectable()
export class MyAdvService
{
    baseUrl:String=AppProperties.ip+':9080'
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
        let body={
            userId:null,
            status:this.myAdvForm.value.advStatus
        }

        return this.http.post(this.baseUrl+"/user/getMyAdvertisements",body);
    }


}