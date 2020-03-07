import { Component,OnInit} from '@angular/core';
import {AppService} from './app.service'
import { interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[AppService]
})
export class AppComponent implements OnInit {

  constructor(private service:AppService) { }

  ngOnInit() {
  /*  interval(1*60000).subscribe(()=>this.service.sendOnlineRequest()
    .subscribe(
      (data)=>console.log(data),
      (error)=>console.log(error)
    )
    );
    */
  }

}
