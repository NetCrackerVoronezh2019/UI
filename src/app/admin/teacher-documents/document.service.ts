import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserDocument} from '../../classes/userDocument'
import {ChangeDocumentValidation} from '../../classes/changeDocumentValidation'
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';

@Injectable()

export class DocumentService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient,private http2: Http){}


    getAllValidDocuments()
    {
        return this.http.get(this.baseUrl+'/getAllValidDocuments');
    }


    getAllUnValidDocuments()
    {
        return this.http.get(this.baseUrl+'/getAllUnValidDocuments');   
    }

    changeDocumentValidaton(row:UserDocument)
    {
        let body:ChangeDocumentValidation=new ChangeDocumentValidation();
        body.id=row.documentId;
        body.validation=!row.isValid;
        console.log(body);
       return this.http.post(this.baseUrl+'/changeDocumentValidation',body)
    }
   
    downloadFile(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getCertFile/'+key, {responseType: ResponseContentType.Blob});
    }
}
