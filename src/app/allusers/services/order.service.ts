import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Order} from '@MainClasses/order';

@Injectable()
export class OrderService
{
    baseUrl:String='http://localhost:9080';
    constructor(private fb:FormBuilder,private http:HttpClient){}

    EditOrderForm=this.fb.group(
        {
            "orderStatus":[""]
        }
        
    );

    getEditForm()
    {
        return this.EditOrderForm;
    }

    setStatus(status:String)
    {
        this.EditOrderForm.setValue({
            orderStatus:status,            
         },{onlySelf:true});   

    }


    getMyId()
    {
        return this.http.get(this.baseUrl+"/getMyId");
    }
    changeOrderStatus(order:Order)
    {
        let body={
            orderId:order.orderId,
            orderStatus:this.EditOrderForm.value.orderStatus,
            customerId:order.customerId,
            freelancerId:order.freelancerId,
            
            
        }

        console.log(body);
        return this.http.post(this.baseUrl+"/user/changeOrderStatus",body);
    }

    getMyOrders()
    {
        return this.http.get(this.baseUrl+"/user/getMyOrders");
    }
}
