import { Component, OnInit,Input} from '@angular/core';
import {AdvNotification} from '../../classes/advNotification'
import {AdvertisementService1} from '../services/advertisement.service'
import { Router} from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers:[AdvertisementService1]
})
export class NotificationsComponent implements OnInit {

  @Input() notifications:AdvNotification[];
  public reiting:any;
  public not:AdvNotification;
  constructor(private service:AdvertisementService1, private router:Router) { }

  ngOnInit() {
  
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
    x.responseStatus="ACCEPTED";
    console.log(x);
    this.router.navigate(['/myorders/']);
    this.service.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getMyAllNotifications(),
      error=>console.log(error)
    )

  }

  onReject(x:AdvNotification)
  {
    x.responseStatus="REJECTED";
    console.log(x);
    this.service.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getMyAllNotifications(),
      error=>console.log(error)
    ) 
  }

  sendReiting()
  {
    this.service.sendReiting(this.reiting,this.not)
    .subscribe(
      (data)=>{console.log("change"); this.getMyAllNotifications()},
      error=>console.log(error)
    ) 
  }

  raitingClick(event,not:AdvNotification)
  {
    this.reiting=event.target.attributes.value.value;
    this.not=not;
    console.log(not);
    
  }
}
