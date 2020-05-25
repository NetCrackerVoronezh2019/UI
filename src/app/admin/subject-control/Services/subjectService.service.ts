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
            "withoutEdit":[""],
            "translateName": [""]
        } 
    );


    editSubject()
    {
        let withoutEdit=this.subjectForm.value.withoutEdit;
        let name=this.subjectForm.value.translateName;
        let body={
            withoutEdit,
            name,
        }
        return this.http.post(this.baseUrl+"/editSubject",body);
    }
    setFormControl(id,name)
    {
        this.subjectForm.setValue({
            withoutEdit:name,
            translateName:name
         },{onlySelf:true});
    }
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