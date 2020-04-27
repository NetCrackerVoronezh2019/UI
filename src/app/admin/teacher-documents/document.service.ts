import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserDocument} from '../../classes/userDocument'
import {User} from '../../classes/user'
import {ChangeDocumentValidation} from '../../classes/changeDocumentValidation'
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';

@Injectable()

export class DocumentService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient,private http2: Http){}

    changeDocumentValidaton(row:UserDocument)
    {
        let body:ChangeDocumentValidation=new ChangeDocumentValidation();
        body.id=row.documentId;
        body.validation=!row.isValid;
        console.log(body);
       return this.http.post(this.baseUrl+'/changeDocumentValidation',body)
    }


    saveUserChanges(user:User)
    {
        return this.http.post(this.baseUrl+'/saveUserChanges',user)
    }

    getAllTeachers()
    {
        return this.http.get(this.baseUrl+'/getAllTeachers');
    }
   
    downloadFile(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getCertFile/'+key, {responseType: ResponseContentType.Blob});
    }
}
