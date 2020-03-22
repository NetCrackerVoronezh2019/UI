import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Advertisement} from '../../classes/advertisement'

@Injectable()
export class AdvertisementService
{
    baseUrl:String='http://localhost:9080';
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
            this.http.get(this.baseUrl+'/advertisement/'+id)
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
                deadline:this.advertisementForm.value.deadlineDate+" 00:00",
                description:this.advertisementForm.value.description,
                budget:this.advertisementForm.value.budget,
                content:this.advertisementForm.value.image.value
            };
            console.log(body);
            return this.http.post(this.baseUrl+'/addAdvertisement',body);
            
        }

        
        getAdvForm()
        {
            return this.advertisementForm;
        }


        getSubjects()
        {
            return this.http.get(this.baseUrl+"/getAllSubjects");
        }
}