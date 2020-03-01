import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';

@Injectable()

export class SubjectService
{
    constructor(private http:HttpClient,private fb:FormBuilder){}
    subjectForm=this.fb.group(
        {  
            "id": [""],
            "name": [""],
            "translateName": [""],
            "url": [""]
        } 
    );

    sendSubjectForm()
    {
        return this.subjectForm;
    }
    getSubjects()
    {
        return this.http.get("http://localhost:1122/allsubjects");
    }

    sendNewSubject()
    {
        let body={
            name:this.subjectForm.value.name,
            translateName:this.subjectForm.value.translateName,
            url:this.subjectForm.value.url
        }

        return this.http.post("http://localhost:9080/addnewsubject",body);
    }

}