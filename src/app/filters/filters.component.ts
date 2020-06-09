import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  panelOpenState = false;
  S = false;
  M = false;
  XXL=false;
  XXXL=true;
  red=false;
  public black=true;
  white=false;
  yellow=false;
  constructor() { }

  ngOnInit() {
  }

}
