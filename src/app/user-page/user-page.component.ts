import { Component, OnInit } from '@angular/core';
import {User} from '../сlasses/user'
import {RegistrationService} from '../services/registration.service'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  providers:[RegistrationService]
})
export class UserPageComponent implements OnInit {

  user:User;
  constructor(private regService:RegistrationService) { }

  ngOnInit() {
    this.user=new User();
    this.user.id=1;
    this.user.firstName="Armen";
    this.user.lastName="Tovmasyan";
    this.user.email="armentovmasyan@gmail.com";
    this.user.telephoneNumber="+79204473470"
    }


    edit()
    {
      this.regService.sendEditedInformation()
    }
}
