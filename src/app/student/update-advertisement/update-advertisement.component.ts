import { Component, OnInit,Input} from '@angular/core';
import { Router} from '@angular/router';
import {AdvertisementService} from '../services/advertisement.service'
import {Subject} from '../../classes/subject'

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class UpdateAdvertisementComponent implements OnInit {


  @Input() id:Number;
  subjects:Subject;
  constructor(private router: Router,private service:AdvertisementService) { }

  ngOnInit() {
    this.service.getExistsAdvertisement(this.id);
    this.service.getSubjects()
    .subscribe(
      (s:Subject)=>this.subjects=s,
      (error)=>console.log(error)
    )
  }

  onSubmit()
  {
     this.service.updateData(this.id).
    subscribe(
      (data)=>  this.router.navigate(['/']),
      (error)=>console.log(error)
    )
  }

}
