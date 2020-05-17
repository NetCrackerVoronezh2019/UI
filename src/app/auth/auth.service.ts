import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {AppProperties} from 'src/app/appProperties'


@Injectable()
export class AuthService
{

    baseUrl:String=AppProperties.ip+':9080';
    constructor(private http:HttpClient){}

    getlicense()
    {
        return true;
    }

    getRole()
    {
        return this.http.get(this.baseUrl+'/getRole');  
    }

    isLogin()
    {
        return this.http.get(this.baseUrl+'/isLogin');  
    }

}