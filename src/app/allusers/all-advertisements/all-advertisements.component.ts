import { Component, OnInit,Input } from '@angular/core';
import {Advertisement} from '../../classes/advertisement';
import {AdvertisementService1} from '../services/advertisement.service';

@Component({
  selector: 'app-all-advertisements',
  templateUrl: './all-advertisements.component.html',
  styleUrls: ['./all-advertisements.component.scss'],
  providers:[AdvertisementService1]
})
export class AllAdvertisementsComponent implements OnInit {

  @Input() advs:Advertisement[];

  constructor(private service:AdvertisementService1) { }

  ngOnInit() {
    /*
    this.service.getAllAdvertisements()
    .subscribe(
      (data:Advertisement[])=>{
		  this.advs=data;
		  console.log(this.advs);
	  },
      error=>console.log(error)
    )
    */
  }

}
