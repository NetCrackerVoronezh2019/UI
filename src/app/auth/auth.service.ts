import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService
{

    baseUrl:String='http://localhost:9080';
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