import { Component, OnInit } from '@angular/core';
import {FilterService} from './Services/filterService.service'
import{Filters} from '../../classes/filters'

@Component({
  selector: 'app-advertisement-filter',
  templateUrl: './advertisement-filter.component.html',
  styleUrls: ['./advertisement-filter.component.scss'],
  providers:[FilterService]
})
export class AdvertisementFilterComponent implements OnInit {

  constructor(private service:FilterService) { }

  filters:Filters
  
  checked = false;
  indeterminate = false;

  ngOnInit() {
    this.getAllFilters();
    
  }


  getAllFilters()
  {
    this.service.getAllFilters()
    .subscribe(
      (data:Filters)=>{
        this.filters=data;
        this.setAllSubjectsChecked();
      },
      (error)=>console.log(error)
    )
  }

  setAllSubjectsChecked()
  {
    for(let i=0;i<this.filters.subjects.length;i++)
        this.filters.subjects[i].checked=true;
  }
  refresh()
  {
    console.log(this.filters);
  }
}
