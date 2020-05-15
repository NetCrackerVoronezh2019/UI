import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';

@Injectable()

export class SubjectService
{
    baseUrl:String='http://95.30.222.140:9080';
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
        return this.http.post("http://95.30.222.140:9080/admin/addNewSubject",body);
    }

}