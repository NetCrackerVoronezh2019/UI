import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {AdvertisementService} from '../services/advertisement.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  adv:Advertisement;
  id:String;
  isLoading=false;
  subscription:Subscription;
  constructor(private service:AdvertisementService,private activateRoute: ActivatedRoute) { }

  ngOnInit() {
      this.subscription=this.activateRoute.params.subscribe(params=>{
        this.id=params['id'];
        this.getAdvById(this.id);
      } 
    );
}

  getAdvById(id)
  {
    this.service.getAdvertisementById(id)
    .subscribe(
      (data:Advertisement)=>{this.adv=data; console.log(this.adv); this.isLoading=true;},
      error=>console.log(error)
      
    )
  }
}
