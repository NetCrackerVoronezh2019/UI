
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Filters} from '../../../classes/filters'

@Injectable()
export class FilterService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient,private fb:FormBuilder){}

    filterForm=this.fb.group(
        {  
            "minPrice": [""],
            "maxPrice":[""],
            "searchRow":[""]
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

    sendFilterResults(filters:Filters)
    {
        filters.minPrice=this.filterForm.value.minPrice;
        filters.maxPrice=this.filterForm.value.maxPrice;
        filters.searchRow=this.filterForm.value.searchRow;
        console.log(filters);
        return this.http.post('http://localhost:1122'+"/filterAdvertisements",filters);
    }

    getAllAdvertisements()
    {
        return this.http.get(this.baseUrl+'/allAdvertisements');
    }

}