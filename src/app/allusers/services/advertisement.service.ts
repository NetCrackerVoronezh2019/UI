
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AdvertisementService1
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient){}

    getAllAdvertisements()
    {
        return this.http.get(this.baseUrl+'/allAdvertisements');
    }

    getAdvertisementById(id)
    {
        return this.http.get(this.baseUrl+'/advertisement/'+id);
        
    }

    isMyAdvertisement(id:Number)
    {

        let body={
            userId:null,
            advertisementId:id
        }
        return this.http.post(this.baseUrl+"/isMyAdvertisement",body)
    }
}