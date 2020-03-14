import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../services/advertisement.service'
import {Subject} from '../../classes/subject'

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class UpdateAdvertisementComponent implements OnInit {


  subjects:Subject;
  constructor(private service:AdvertisementService) { }

  ngOnInit() {
    this.service.getExistsAdvertisement(207);
    this.service.getSubjects()
    .subscribe(
      (s:Subject)=>this.subjects=s,
      (error)=>console.log(error)
    )
  }

}
