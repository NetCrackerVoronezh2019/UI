
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AdvertisementService
{
    constructor(private http:HttpClient){}

    getAllAdvertisements()
    {
        return this.http.get('http://localhost:8080/alladvertisements');
    }
}