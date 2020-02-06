import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../services/advertisement.service';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class AddAdvertisementComponent implements OnInit {

  constructor(private advService:AdvertisementService) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.advService.sendData()
   .subscribe(
      (data:any) => console.log(data),
      (error:any) => console.log(error) 
   );
  }

}
