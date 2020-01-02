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
  private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute,private activateService:ActivateService){
    
    this.subscription=activateRoute.params.subscribe(params=>this.activateCode=params['activateCode']);
    activateService.sendActivateCode(this.activateCode).subscribe(
            (data:Response) => 
            {
                console.log('всё нормально');
				this.isActivate=true;
            },
            error => {console.log('ошибка - '+error.status); this.isActivate=false}
        );
  }

  ngOnInit() {
  }

}
