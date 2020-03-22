
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Filters} from '../../../classes/filters'

@Injectable()
export class FilterService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient){}

    getAllFilters()
    {
        return this.http.get(this.baseUrl+"/getAllFilters");
    }

    sendFilterResults(filters:Filters)
    {
        return this.http.post(this.baseUrl+"/getAdvertisementsAfterFiltering",filters);
    }
}