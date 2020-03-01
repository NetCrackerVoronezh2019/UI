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
            "description":[""],
            "budget":[""],
            "imageUrl":[""]
        })       

        sendData()
        {
            let body={
				advertisementName:this.advertisementForm.value.advertisementName,
                section:this.advertisementForm.value.advertisementSection,
                deadline:this.advertisementForm.value.deadlineDate+"T"+this.advertisementForm.value.deadlineTime,
                description:this.advertisementForm.value.description,
                budget:this.advertisementForm.value.budget,
                imageUrl:this.advertisementForm.value.imageUrl
            };
            
            console.log(body);

            return this.http.post('http://localhost:9080/student/addadvertisement',body);
            
        }

        
        getAdvForm()
        {
            return this.advertisementForm;
        }


        getSubjects()
        {
            return this.http.get("http://localhost:1122/allsubjects");
        }
}