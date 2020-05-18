import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {AdvertisementService1} from '../services/advertisement.service';
import {AdvertisementService} from '../../student/services/advertisement.service'
import {Order} from '../../classes/order'
import { Router} from '@angular/router';
import * as fileSaver from 'file-saver';
import { DomSanitizer } from "@angular/platform-browser";
import {OrderService} from '../services/order.service'


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers:[AdvertisementService1,AdvertisementService,OrderService]
})
export class AdvertisementComponent implements OnInit {
  img:any;
  id:Number;
  role:any;
  adv:Advertisement;
  isUserAdv:Boolean=false;
  isLoading=false;
  subscription:Subscription;
  can:Boolean=false;
  showMessage=false;
  order:Order;
  coverImage:any;
  message:String='Вы точно хотите получить этот заказ ?'
  buttonHidden:Boolean=true;
  deleteMessage;
  constructor(private service:AdvertisementService1, private service2:AdvertisementService,
    private activateRoute: ActivatedRoute,
    private router:Router,
    private orderService:OrderService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
      
      this.subscription=this.activateRoute.params.subscribe(params=>{
        this.id=params['id'];
        this.getAdvById(this.id);
        this.getRole();
      } 
    );
  }

  changeAdvStatus()
  {
    let status;
    if(this.adv.status=='ACTIVE')
      status='ARCHIVED';
    else
      status="ACTIVE"
    this.service.changeAdvertisementStatus(this.id,status)
        .subscribe(
          (data:Advertisement)=>this.adv=data,
          error=>console.log(error)
        )
  }

  sendRequest()
  {
    
  }

  isMyOrder()
  {
    this.service.myOrder(this.id)
        .subscribe(
          (data:Order)=>{this.order=data,console.log("isMyOrder"); console.log(data)},
          (error)=>console.log(error)
        )
  }


  changeStatus()
  {
    this.orderService.changeOrderStatus(this.order)
      .subscribe(
        (data)=>this.isMyOrder(),
        error=>console.log(error)
      )
  }
  

  changeMessage(){
    if(this.role=="ROLE_TEACHER")
      this.message='Вы точно хотите получить этот заказ ?';
    else
    {
      this.message='Вы точно хотите получить этy услугу ?';
    }
  }
  
  getRole()
  {
    this.service.getRole()
    .subscribe(
      (data:any)=>
      {
        this.role=data.roleName;
        this.isMyAdv(this.id);
        this.canSendRequest();
        this.isMyOrder();
        this.changeMessage();
      },
      error=>{console.log(error)}
    )
  }

  getAdvById(id)
  {
    console.log("user"+id);
    this.service.getAdvertisementById(id)
    .subscribe(
      (data:Advertisement)=>{
        this.adv=data;this.isLoading=true;
        console.log(this.adv);
        this.downloadCoverImage(this.adv.coverImageKey)
      },
      error=>console.log(error)
    )
  }

  isMyAdv(id:Number)
  {
    this.service.isMyAdvertisement(id)
    .subscribe(
      (data:Boolean)=>{this.isUserAdv=data,console.log(this.isUserAdv+"isuseradv")},
      (error)=>console.log(error)
    )
  }

  sendNotification()
  {
    this.service.sendNotification(this.adv,this.role)
    .subscribe(
      (data)=>{this.message="Всё прошло успешно !", this.canSendRequest(); this.showMessage=true; this.buttonHidden=false},
      error=>{this.message="Ошибка при отправке"; this.buttonHidden=false}
      )
  }  

  canSendRequest()
  {
    this.service.canSendRequest(this.id)
    .subscribe(
      (data:Boolean)=>this.can=data,
      error=>console.log(error)
    )
  }

  download(key:String)
  {
    let name:String=key.split('_')[1];
    let fileType:any;
    if(name.split('.')[1]=='pdf')
    fileType='application/pdf; charset=utf-8';
    else
      fileType='image/jpg; charset=utf-8';
    this.service.downloadFile(key)
      .subscribe(
        (response) => {
          let blob:any = new Blob([response.blob()], { type:fileType});

          fileSaver.saveAs(blob,name);
        },
         error => console.log('Error downloading the file')
      )
  }
  
  downloadCoverImage(key:String)
  {

    this.service.downloadFile(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          this.coverImage=URL.createObjectURL(blob)
          this.coverImage=this.sanitizer.bypassSecurityTrustUrl(this.coverImage);
        },
         error => console.log('Error')
      )
  }


  deleteAdvertisement()
  {
      this.service.deleteAdvertisement(this.id)
          .subscribe(
            data=>{},
            error=>console.log(this.deleteMessage="Произошла ошибка")
          )
  }
}
