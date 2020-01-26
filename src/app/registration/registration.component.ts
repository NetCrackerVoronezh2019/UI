import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {RegistrationService} from './Services/registration.service';
import {MatInputModule} from '@angular/material/input';
import {Roles} from '../roles'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})



export class RegistrationComponent implements OnInit {

  
   role="STUDENT";
  constructor(public regService:RegistrationService) {
  
  }
  ngOnInit() {
    
  }

  onSubmit()
  {
    if(!this.regService.getRegForm().invalid)
    {
      alert("send a data");
      this.regService.sendRegistrationInformation(this.role);
    }
    else
    {
      alert("dont send a data");
    }

  }

  setRole(someobject)
  {
    //console.log(this.role);
    let myRole=someobject.target.attributes['role'].value
    console.log(myRole);
    this.role=myRole;
  }

 

}
