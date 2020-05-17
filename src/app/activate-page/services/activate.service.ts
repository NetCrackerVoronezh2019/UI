import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppProperties} from 'src/app/appProperties'

@Injectable()

export class ActivateService
{
     baseUrl:String=AppProperties.ip+':9080';
    constructor(private http:HttpClient){}

    sendActivateCode(code:String)
    {
           return this.http.get(this.baseUrl+'/activate/'+code);	
    }
}