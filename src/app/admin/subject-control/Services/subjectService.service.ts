import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import {AppProperties} from 'src/app/appProperties'


@Injectable()

export class SubjectService
{
    baseUrl:String=AppProperties.ip+':9080';
    constructor(private http:HttpClient,private fb:FormBuilder){}
    subjectForm=this.fb.group(
        {  
            "id": [""],
            "name": [""],
            "translateName": [""]
        } 
    );

    sendSubjectForm()
    {
        return this.subjectForm;
    }
    getSubjects()
    {
        return this.http.get(this.baseUrl+"/getAllSubjects");
    }

    sendNewSubject()
    {
        let body={
            name:this.subjectForm.value.name,
            translateName:this.subjectForm.value.translateName,
        }
        
        console.log(body);
        return this.http.post(this.baseUrl+"/admin/addNewSubject",body);
    }

}