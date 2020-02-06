import { Component, OnInit } from '@angular/core';
import{Advertisement} from '../../classes/advertisement';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  adv:Advertisement;
  id:String;
  subscription:Subscription;
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription=this.activateRoute.params.subscribe(params=>this.id=params['id']);
    console.log(this.id);
  }

}
