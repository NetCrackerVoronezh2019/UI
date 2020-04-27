import { Component, OnInit,Input } from '@angular/core';
import {Order} from '../../classes/order'
@Component({
  selector: 'app-user-feed-back',
  templateUrl: './user-feed-back.component.html',
  styleUrls: ['./user-feed-back.component.scss']
})
export class UserFeedBackComponent implements OnInit {
  @Input() order:Order;
  rating1:any[]=[];
  rating2:any[]=[];
  constructor() { }

  ngOnInit() {
       this.rating1=[]
        this.rating2=[]
        if(this.order.starsForWork!=0)
        {

          for(let i=0;i<this.order.starsForWork;i++)
            this.rating1.push(1);

            for(let i=5;i>this.order.starsForWork;i--)
            this.rating2.push(1);

        }
  }

}
