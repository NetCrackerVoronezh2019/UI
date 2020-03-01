
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AdvertisementService
{
    constructor(private http:HttpClient){}

    getAllAdvertisements()
    {
        return this.http.get('http://localhost:9080/alladvertisements');
    }

    getAdvertisementById(id)
    {
        return this.http.get('http://localhost:9080/advertisement/'+id);
        
    }
}