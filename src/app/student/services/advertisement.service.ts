import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Advertisement} from '../../classes/advertisement'
import {Tag} from '../../classes/tag'

@Injectable()
export class AdvertisementService
{
    baseUrl:String='http://95.30.222.140:9080';
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
                    deadlineDate:adv.dateOfPublication.split('T')[0],
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

        updateData(id:Number)
        {
            let body={
                advertisementId:id,
				advertisementName:this.advertisementForm.value.advertisementName,
                section:this.advertisementForm.value.advertisementSection,
                deadline:this.advertisementForm.value.deadlineDate+"T00:00:00",
                description:this.advertisementForm.value.description,
                budget:this.advertisementForm.value.budget,
                content:null
            };
            console.log(body);
            return this.http.post("http://95.30.222.140:1122/"+'updateAdvertisementInformation',body);
        }
        sendData(tags:Tag[],allFiles,coverImage)
        {
            let body={
				advertisementName:this.advertisementForm.value.advertisementName,
                section:this.advertisementForm.value.advertisementSection,
                deadline:this.advertisementForm.value.deadlineDate+"T00:00:00",
                description:this.advertisementForm.value.description,
                budget:this.advertisementForm.value.budget,
                coverImage,
                tags,
                allFiles

            };
          
            return this.http.post(this.baseUrl+'/user/addAdvertisement',body);

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
