import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {RegistrationService} from './Services/registration.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})
export class RegistrationComponent implements OnInit {

  constructor(public regService:RegistrationService) {}
  ngOnInit() {
  }

  onSubmit()
  {
    if(!this.regService.getRegForm().invalid)
    {
      alert("send a data");
      this.regService.postData();
    }
    else
    {
      alert("dont send a data");
    }
  }
}
