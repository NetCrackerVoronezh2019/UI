import { Component, Input,OnInit } from '@angular/core';
import {Advertisement} from '../../classes/advertisement'

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss']
})
export class AdvertisementCardComponent implements OnInit {

  @Input() adv:Advertisement;
  constructor() { }

  ngOnInit() {
  }

}
