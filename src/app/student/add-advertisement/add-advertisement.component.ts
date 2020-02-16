import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../services/advertisement.service';
import {Subject} from '../../classes/subject';
@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class AddAdvertisementComponent implements OnInit {

  subjects:Subject[];
  constructor(private advService:AdvertisementService) { }

  ngOnInit() {
	   this.advService.getSubjects()
   .subscribe(
     (data:Subject[])=>{this.subjects=data; console.log(this.subjects)},
     error=>console.log(error)
   )
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
