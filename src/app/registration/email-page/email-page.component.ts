import { Component, OnInit,Input} from '@angular/core';
import {Subscription} from 'rxjs'
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.scss']
})
export class EmailPageComponent implements OnInit {

  
  subscription:Subscription;
  email:any
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription=this.activateRoute.params.subscribe(params=>{
      this.email=params['emailAdress'];
    } 
  );
  }

}
