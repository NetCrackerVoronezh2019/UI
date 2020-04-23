
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Advertisement } from '@MainClasses/advertisement';
import { AdvNotification } from '@MainClasses/advNotification';
import {Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';
import {File} from '../../classes/file'

@Injectable()
export class AdvertisementService1
{
    baseUrl:String='http://localhost:9080';
    constructor(private http:HttpClient,private http2: Http){}

    myOrder(id)
    {
        let body={
            advertisementId:id,
            userId:168
        }

        return this.http.post(this.baseUrl+'/user/isMyOrder',body);
    }

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
        console.log("advId"+id)
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


    downloadFile(key:String): Observable<any>{
        return this.http2.get('http://localhost:1234/getAdvImg/'+key, {responseType: ResponseContentType.Blob});
    }


    sendReiting(r:Number,not:AdvNotification)
    {
        console.log(not);
        let body={
            rating:r,
            notif:not
        }       
        
        console.log(body);
        return this.http.post(this.baseUrl+"/user/changeReiting",body);
    }

    
}
