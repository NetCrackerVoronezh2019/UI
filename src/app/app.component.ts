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
  }

}
