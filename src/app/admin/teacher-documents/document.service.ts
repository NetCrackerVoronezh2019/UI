import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserDocument} from '../../classes/userDocument'
import {User} from '../../classes/user'
import {ChangeDocumentValidation} from '../../classes/changeDocumentValidation'
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';
import { FormGroup, FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';
@Injectable()

export class DocumentService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient,private http2: Http,private fb:FormBuilder){}


    SearchForm=this.fb.group(
        {
            "search":[""],
            
        }
    );


    getSearchForm(){
        return this.SearchForm;
    }


    changeDocumentValidaton(row:UserDocument)
    {
        let body:ChangeDocumentValidation=new ChangeDocumentValidation();
        body.id=row.documentId;
        body.validation=!row.isValid;
        console.log(body);
       return this.http.post(this.baseUrl+'/changeDocumentValidation',body)
    }


    saveUserChanges(user:User,doc)
    {
        let body={
            userId:user.userId,
            userDocument:doc
        }
        console.log(body);
        return this.http.post(this.baseUrl+'/saveUserChanges',body)
    }

    getAllTeachers()
    {
        return this.http.get(this.baseUrl+'/getAllTeachers');
    }


    getAllUnCheckedTeachers()
    {
        return this.http.get(this.baseUrl+'/getAllUnCheckedTeachers');
    }
   
    downloadFile(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getCertFile/'+key, {responseType: ResponseContentType.Blob});
    }


    filterTeachers(state)
    {
        let text=this.SearchForm.value.search;
        return this.http.get(this.baseUrl+"/admin/getTeachersByStatus/"+text+"/"+state);
    }
}
