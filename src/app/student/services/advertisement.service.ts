import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()

export class AdvertisementService
{
    constructor(private fb:FormBuilder,private http: HttpClient) {}
     advertisementForm=this.fb.group(
        {  
            "advertisementName":[""],
            "advertisementSection":[""],
            "deadlineDate":[""],	
			"deadlineTime":[""],	
            "description":[""]
        })       

        sendData()
        {
            let body={
				advertisementName:this.advertisementForm.value.advertisementName,
                advertisementSection:this.advertisementForm.value.advertisementSection,
                deadlineDate:this.advertisementForm.value.deadlineDate+" "+this.advertisementForm.value.deadlineTime,
                description:this.advertisementForm.value.description
            };
            
            console.log(body);

            return this.http.post('http://localhost:8080/student/addadvertisement',body);
            
        }

        
        getAdvForm()
        {
            return this.advertisementForm;
        }
}