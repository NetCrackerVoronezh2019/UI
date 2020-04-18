import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()

export class UserPageService
{
    constructor(private fb:FormBuilder,private http: HttpClient) {}

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
}