import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {AdvertisementService1} from '../services/advertisement.service';
import {AdvertisementService} from '../../student/services/advertisement.service'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers:[AdvertisementService1,AdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  id:Number;
  adv:Advertisement;
  isUserAdv:boolean=false;
  isLoading=false;
  subscription:Subscription;
  constructor(private service:AdvertisementService1, private service2:AdvertisementService,private activateRoute: ActivatedRoute) { }

  ngOnInit() {
      
      this.subscription=this.activateRoute.params.subscribe(params=>{
        this.id=params['id'];
        this.getAdvById(this.id);
        this.isMyAdv(this.id)
      } 
    );
}

  getAdvById(id)
  {
    this.service.getAdvertisementById(id)
    .subscribe(
      (data:Advertisement)=>{this.adv=data; this.isLoading=true;},
      error=>console.log(error)
    )
  }

  isMyAdv(id:Number)
  {
    this.service.isMyAdvertisement(id)
    .subscribe(
      (data)=>this.isUserAdv=true,
      (error)=>console.log(error)
    )
  }

  sendNotification()
  {
    this.service.sendNotification(this.adv)
    .subscribe(
      (data)=>console.log(data),
      error=>console.log(error)
      )
  }  
  
}
