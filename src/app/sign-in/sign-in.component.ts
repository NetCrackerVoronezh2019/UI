import { Component, OnInit } from '@angular/core';
import {SignInService} from './Services/signIn.Service'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers:[SignInService]
})
export class SignInComponent implements OnInit {

  constructor(public signInService:SignInService){ }

  ngOnInit() {
  }

  onSubmit()
  {
    alert("отправка данных");
    this.signInService.sendData();
  }

}
