
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Filters} from '../../../classes/filters'
import {Tag} from '../../../classes/tag'
import {AppProperties} from 'src/app/appProperties'


@Injectable()
export class FilterService
{
    baseUrl:String=AppProperties.ip+':9080';
    constructor(private http:HttpClient,private fb:FormBuilder){

    }

    filterForm=this.fb.group(
        {  
            "minPrice": [""],
            "maxPrice":[""],
            "searchRow":[""],
            "type":[""]
        } 
    );


    getFilterForm()
    {
        return this.filterForm;
    }


    getAllFilters()
    {
        return this.http.get(this.baseUrl+"/getAllFilters");
    }

    sendFilterResults(filters:Filters,tags:Tag[],state)
    {
        filters.minPrice=this.filterForm.value.minPrice;
        filters.maxPrice=this.filterForm.value.maxPrice;
        filters.searchRow=this.filterForm.value.searchRow;
        filters.type=state;
        filters.tags=tags;

        console.log(filters);
        return this.http.post(this.baseUrl+"/filterAdvertisements",filters);
    }

    getAllAdvertisements()
    {
        return this.http.get(this.baseUrl+'/allAdvertisements');
    }

}