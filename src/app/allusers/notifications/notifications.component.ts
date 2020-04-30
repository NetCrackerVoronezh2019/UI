import { Component, OnInit,Input} from '@angular/core';
import {AdvNotification} from '../../classes/advNotification'
import {AdvertisementService1} from '../services/advertisement.service'
import { Router} from '@angular/router';
import {UserPageService} from '../../userpage2/userpage.service'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers:[AdvertisementService1,UserPageService]
})
export class NotificationsComponent implements OnInit {

  @Input() notifications:AdvNotification[];
  public reiting:any;
  public not:AdvNotification;
  public images=[];
  profileImage;
  ready=false;
  constructor(private service:AdvertisementService1, private router:Router,
    private userService:UserPageService,
    private sanitizer: DomSanitizer) { }
  
  ngOnInit() {
  //  this.getImages()
  }


  
  getImages()
  {
      for(let i=0;i<this.notifications.length;i++)
      {
        let key=this.notifications[i].notification.userImageKey;
        if(key!=undefined)
        {
          this.userService.downloadProfileImage(key)
            .subscribe(
              (response) => {
                let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
                this.profileImage=URL.createObjectURL(blob)
                this.profileImage=this.sanitizer.bypassSecurityTrustUrl(this.profileImage);
                this.images[i]=this.profileImage;
              },
              error => {console.log('Error'),this.images[i]='https://dk-almanah.ru/wp-content/uploads/2018/04/197-person-1824144.png'}
              
            )
        }
        else
        {
          this.images[i]='https://dk-almanah.ru/wp-content/uploads/2018/04/197-person-1824144.png';
        }
      }
      this.ready=true;
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
    x.notification.responseStatus="ACCEPTED";
    console.log(x);
   // this.router.navigate(['/myorders/']);
  /*
    this.service.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getMyAllNotifications(),
      error=>console.log(error)
    )

    */

  }

  onReject(x:AdvNotification)
  {
    x.notification.responseStatus="REJECTED";
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
