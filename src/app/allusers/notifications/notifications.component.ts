import { Component, OnInit} from '@angular/core';
import {AdvNotification} from '../../classes/advNotification'
import {AdvertisementService1} from '../services/advertisement.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers:[AdvertisementService1]
})
export class NotificationsComponent implements OnInit {

  notifications:AdvNotification[];
  constructor(private service:AdvertisementService1) { }

  ngOnInit() {
    this.getMyAllNotifications();
    console.log(this.notifications);
  }



  getMyAllNotifications()
  {
    this.service.getMyNotifications()
    .subscribe(
      (data:AdvNotification[])=>{this.notifications=data;},
       error=>console.log(error)
    )
  }

  onAccept(x:AdvNotification)
  {
    x.status="ACCEPTED";
    console.log(x);
    this.service.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getMyAllNotifications(),
      error=>console.log(error)
    )

  }

  onReject(x:AdvNotification)
  {
    x.status="REJECTED";
    console.log(x);
    this.service.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getMyAllNotifications(),
      error=>console.log(error)
    ) 
  }
}
