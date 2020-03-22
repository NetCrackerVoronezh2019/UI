import { Component, OnInit } from '@angular/core';
import {Advertisement} from '../../classes/advertisement';
import {AdvertisementService} from '../services/advertisement.service';

@Component({
  selector: 'app-all-advertisements',
  templateUrl: './all-advertisements.component.html',
  styleUrls: ['./all-advertisements.component.scss'],
  providers:[AdvertisementService]
})
export class AllAdvertisementsComponent implements OnInit {

  advs:Advertisement[];
  checked = false;
  indeterminate = false;
  constructor(private service:AdvertisementService) { }

  ngOnInit() {
    this.service.getAllAdvertisements()
    .subscribe(
      (data:Advertisement[])=>{
		  this.advs=data;
		  console.log(this.advs);
	  },
      error=>console.log(error)
	  )
  }

}
