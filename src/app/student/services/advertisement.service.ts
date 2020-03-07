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
            "description":[""],
            "budget":[""],
            "imageUrl":[""],
            "image":[""]
        })       

        sendData()
        {
            let body={
				advertisementName:this.advertisementForm.value.advertisementName,
                section:this.advertisementForm.value.advertisementSection,
                deadline:this.advertisementForm.value.deadlineDate,
                description:this.advertisementForm.value.description,
                budget:this.advertisementForm.value.budget,
                image:this.advertisementForm.value.image
            };
            console.log(body);
            
            const formdata: FormData = new FormData();
            formdata.append('file', body.image.value);
            formdata.append("advertisement",JSON.stringify(body));
            console.log(formdata);
            return this.http.post('http://localhost:9080/addadvertisement',formdata);
            
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