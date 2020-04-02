
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Advertisement } from 'app/classes/advertisement';
import { AdvNotification } from 'app/classes/advNotification';

@Injectable()
export class AdvertisementService1
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient){}

    getAllAdvertisements()
    {
        return this.http.get(this.baseUrl+'/allAdvertisements');
    }

    getAdvertisementById(id)
    {
        return this.http.get(this.baseUrl+'/advertisement/'+id);
        
    }

    isMyAdvertisement(id:Number)
    {
        let body={
            userId:null,
            advertisementId:id
        }
        return this.http.post(this.baseUrl+"/isMyAdvertisement",body)
    }

    sendNotification(adv:Advertisement)
    {
        console.log(adv);
        
        let body={
            addresseeId:adv.authorId,
            advertisementId:adv.advertisementId,
            type:'TAKE_ADVERTISEMENT',
            advertisementName:adv.advertisementName
        }

        console.log(body);
        return this.http.post(this.baseUrl+"/user/newNotification",body)
    }


    getMyNotifications()
    {
        return this.http.get(this.baseUrl+"/user/getMyAllNotifications");
    }


    getMyNotificationsSize()
    {
        return this.http.get(this.baseUrl+"/user/getMyAllNotificationsSize");
    }


    sendNotificationResponse(x:AdvNotification)
    {
        return this.http.post(this.baseUrl+'/user/notificationResponse',x)
    }

    canSendRequest(id:Number)
    {
        return this.http.get(this.baseUrl+"/canSendRequest/"+id);
    }
}