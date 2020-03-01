import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService
{

    constructor(private http:HttpClient){}

    getlicense()
    {
        return true;
    }

    getRole()
    {
        return this.http.get('http://localhost:9080/getrole');  
    }

    isLogin()
    {
        return this.http.get('http://localhost:9080/islogin');  
    }

}