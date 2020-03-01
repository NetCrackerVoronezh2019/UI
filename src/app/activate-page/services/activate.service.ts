import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()

export class ActivateService
{
    constructor(private http:HttpClient){}

    sendActivateCode(code:String)
    {
           return this.http.get('http://localhost:9080/activate/'+code);	
    }
}