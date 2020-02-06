import { Component, OnInit } from '@angular/core';
import {SignInService} from './Services/signIn.Service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers:[SignInService]
})
export class SignInComponent implements OnInit {

  errorMessage:String;
  hasError:any;
  constructor(public signInService:SignInService,private router: Router){ }

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
          console.log(data.email);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
          },
            (error:any) => 
          {
            this.hasError=true;
            this.errorMessage=error.error;
            console.log(error);
          }
         );
  }



}
