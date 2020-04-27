import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Order} from '@MainClasses/order';
import { Advertisement } from '../../classes/advertisement';

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


    orderForm=this.fb.group(
        {
            "comment":[""],
        }
        
    );


    updateOrderForm()
    {
        this.orderForm.setValue({
           comment:""
         },{onlySelf:true});

    }

    getOrderForm()
    {
        return this.orderForm;
    }
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

    getMyRole(){
        return this.http.get(this.baseUrl+"/getRole");
    }

    getOrder(id)
    {
        return this.http.get('http://localhost:1122/getOrder/'+id);
    }

    changeOrderStatus(order:Order)
    {

        let body=
        {
            orderId:order.orderId,
            customerId:order.customerId
        }
        return this.http.post(this.baseUrl+"/user/changeOrderStatus",body);
    }

    getMyOrders(state)
    {
        let body={
            status:state
        }

        return this.http.post(this.baseUrl+"/user/getUserOrdersByOrderStatus",body);
    }

    sendFeedBack(rating:any,order:Order)
    {
        let body={
            orderId:order.orderId,
            rating:rating,
            comment:this.orderForm.value.comment
        }
        console.log(body);
        return this.http.post(this.baseUrl+'/user/changeReiting',body);
    }
}
