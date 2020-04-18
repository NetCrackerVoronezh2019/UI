import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';


@Injectable()

export class UserPageService
{
    constructor(private fb:FormBuilder,private http: HttpClient,private http2: Http) {}

    getUserData(id:Number)
    {
        return this.http.get('http://localhost:9080/getUser/'+id);
    }


    getOrders(id:Number)
    {
        return this.http.get('http://localhost:1122/getFreelancerOrders/'+id)
    }

    getAllAdvertisements(id:Number)
    {
        return this.http.get('http://localhost:1122/myAdvertisements/'+id)   
    }


    getMyId()
    {
        return this.http.get('http://localhost:9080/getMyId');       
    }

    updateImage(content)
    {
      let body={
        content:content
      }
  
      
      return this.http.post("http://localhost:9080/user/updateUserImage",body);
    }


    downloadFile(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getCertFile/'+key, {responseType: ResponseContentType.Blob});
    }
}