import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Advertisement} from '../../classes/advertisement'

@Injectable()
export class AdvertisementService
{
    constructor(private fb:FormBuilder,private http: HttpClient) {}
     advertisementForm=this.fb.group(
        {  
            "advertisementId":[],
            "advertisementName":[""],
            "advertisementSection":[""],
            "deadlineDate":[""],		
            "description":[""],
            "budget":[""],
            "image":[""]
        })  
        
        
        setFormValues(adv:Advertisement){
                this.advertisementForm.setValue({
                    advertisementId:adv.advertisementId,
                    advertisementName:adv.advertisementName,
                    advertisementSection:adv.section,
                    budget:adv.budget,
                    description:adv.description,
                    deadlineDate:adv.deadline,
                    image:null
                 },{onlySelf:true});

                 console.log(this.advertisementForm);
        }

        getExistsAdvertisement(id)
        {
            console.log("send request");
            this.http.get('http://localhost:9080/advertisement/'+id)
            .subscribe(
                (adv:Advertisement)=>{
                    console.log(adv);
                    this.setFormValues(adv)
                },
                (error)=>console.log(error)
            )
        }

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