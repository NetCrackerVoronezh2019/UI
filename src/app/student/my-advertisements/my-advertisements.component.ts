import { Component, OnInit } from '@angular/core';
import {MyAdvService} from '../services/my-advertisement.service'
import {Advertisement} from '../../classes/advertisement'

@Component({
  selector: 'app-my-advertisements',
  templateUrl: './my-advertisements.component.html',
  styleUrls: ['./my-advertisements.component.scss'],
  providers:[MyAdvService]
})
export class MyAdvertisementsComponent implements OnInit {

  advs:Advertisement[];
  constructor(private service:MyAdvService) { }

  ngOnInit() {
    this.service.setFormValues();
    this.getAdvByStatus();
  }


  onClick()
  {
    this.service.getFormInfo();
  }

  getAdvByStatus()
  {
    this.service.getAdvertisementsByStatus()
    .subscribe(
      (data:Advertisement[])=>this.advs=data,
      (error)=>console.log(error)
    )
  }

}
