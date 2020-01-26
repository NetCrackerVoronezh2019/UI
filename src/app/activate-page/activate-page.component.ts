import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs'
import {ActivateService} from './services/activate.service'
@Component({
  selector: 'app-activate-page',
  templateUrl: './activate-page.component.html',
  styleUrls: ['./activate-page.component.scss'],
  providers:[ActivateService]
})
export class ActivatePageComponent implements OnInit {

  activateCode:String;
  isActivate:boolean;
  loaded=false;
  private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute,private activateService:ActivateService){
  }

  ngOnInit() {
    this.subscription=this.activateRoute.params.subscribe(params=>this.activateCode=params['activateCode']);
    this.activateService.sendActivateCode(this.activateCode).subscribe(
            (data:Response) => 
            {
                console.log('всё нормально');
                this.isActivate=true;
                this.loaded=true;
            },
            error => {console.log('ошибка - '+error.status); this.isActivate=false;this.loaded=true}
        );
    
  }

}
