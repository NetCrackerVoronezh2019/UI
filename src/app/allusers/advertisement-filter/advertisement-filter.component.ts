import { Component, OnInit } from '@angular/core';
import {FilterService} from './Services/filterService.service'
import{Filters} from '../../classes/filters'
import{Advertisement} from '../../classes/advertisement'

@Component({
  selector: 'app-advertisement-filter',
  templateUrl: './advertisement-filter.component.html',
  styleUrls: ['./advertisement-filter.component.scss'],
  providers:[FilterService]
})
export class AdvertisementFilterComponent implements OnInit {

  constructor(private service:FilterService) { }

  isLoaded=false;
  filters:Filters
  advs:Advertisement[];
  
  ngOnInit() {
    this.getAllFilters();
    this.service.getAllAdvertisements()
    .subscribe(
      (data:Advertisement[])=>{this.advs=data; console.log(data); this.isLoaded=true},
      (error)=>console.log(error)
    )
    
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
        this.filters.subjects[i].isChecked=true;
  }
  refresh()
  {
    this.service.sendFilterResults(this.filters)
    .subscribe(
      (data:Advertisement[])=>this.advs=data,
      (error)=>console.log(error)
    )
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
