
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Advertisement } from '@MainClasses/advertisement';
import { AdvNotification } from '@MainClasses/advNotification';

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

    sendNotification(adv:Advertisement,role)
    {
        console.log(adv);
        let body;
        console.log(role)
        if(role=="ROLE_TEACHER")
        {
             body={
                addresseeId:adv.authorId,
                advertisementId:adv.advertisementId,
                type:'TAKE_ADVERTISEMENT',
                advertisementName:adv.advertisementName
            }
        }
        else
        {
            body={
                addresseeId:adv.authorId,
                advertisementId:adv.advertisementId,
                type:'RECEIVE_SERVICE',
                advertisementName:adv.advertisementName
            }
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

    setAllNotificationasReaded()
    {
        console.log("gfgfdgfd");
        return this.http.get(this.baseUrl+'/user/setNotificatiosAsReaded');
    }
    getRole()
    {
        return this.http.get(this.baseUrl+"/getRole");
    }

    getBytesForImg(adv:Advertisement)
    {
        return this.http.get('http://localhost:1234/getimg/'+adv.imageKeys[0]);
    }
}
