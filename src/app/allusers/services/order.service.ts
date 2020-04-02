import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Order} from 'app/classes/order';

@Injectable()
export class OrderService
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient){}


    getMyOrders()
    {
        return this.http.get(this.baseUrl+"/user/getMyOrders");
    }
}