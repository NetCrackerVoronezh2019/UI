import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../services/registration.service'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})
export class RegistrationComponent implements OnInit {

  constructor(public regService:RegistrationService) { }

  ngOnInit() {
  }

  send()
  {
    this.regService.sendRegistrationInformation()
    .subscribe(
      (data)=>console.log(data),
      (error)=>console.log(error)
    )
  }

}
