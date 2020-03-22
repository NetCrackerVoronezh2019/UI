import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()

export class ActivateService
{
     baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient){}

    sendActivateCode(code:String)
    {
           return this.http.get(this.baseUrl+'/activate/'+code);	
    }
}