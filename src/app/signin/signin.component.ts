import { Component, OnInit } from '@angular/core';
import {SignInService} from '../services/signIn.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers:[SignInService]
})
export class SigninComponent implements OnInit {

  errorMessage:String;
  hasError:any;
  constructor(public signInService:SignInService){ }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  onSubmit()
  {
    alert("отправка данных");
    this.signInService.sendData()
      .subscribe(
        (data:any) => 
          {
            localStorage.setItem('token', data.token);
          },
        (error:any) => 
          {
            this.hasError=true;
          }
      );
  }


}
