
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Advertisement } from '@MainClasses/advertisement';
import { AdvNotification } from '@MainClasses/advNotification';
import {Http, ResponseContentType} from '@angular/http';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {File} from '../../classes/file'
import {AppProperties} from 'src/app/appProperties'

@Injectable()
export class AdvertisementService1
{
    baseUrl:String=AppProperties.ip+':9080';
    constructor(private fb:FormBuilder,private http:HttpClient,private http2: Http){}

    deleteForm=this.fb.group(
        {
            "comment":[""],
        }
        
    );

    deleteAdvertisement(id:Number)
    {
        let comment=this.deleteForm.value.comment;
        let body={
            id,
            comment
        }


        console.log(body);

     return this.http.get(AppProperties.ip+":9080/deleteAdvertisement/"+id+"/"+comment);
    }
    getDeleteForm()
    {
        
        return this.deleteForm;
    }
    
    myOrder(id)
    {
        let body={
            advertisementId:id,
            userId:168
        }

        return this.http.post(this.baseUrl+'/user/isMyOrder',body);
    }

    changeAdvertisementStatus(advId,status)
    {
        return this.http.get(this.baseUrl+"/user/changeAdvStatus/"+advId+"/"+status);
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
        return this.http.post(this.baseUrl+'/user/notificationResponse',x.notification)
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
        return this.http.get(AppProperties.ip+':1234/getimg/'+adv.imageKeys[0]);
    }


    downloadFile(key:String): Observable<any>{
        return this.http2.get(AppProperties.ip+':1234/getAdvImg/'+key, {responseType: ResponseContentType.Blob});
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
