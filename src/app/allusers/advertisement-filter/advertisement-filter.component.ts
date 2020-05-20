import { Component, OnInit } from '@angular/core';
import {FilterService} from './Services/filterService.service'
import{Filters} from '../../classes/filters'
import{Advertisement} from '../../classes/advertisement'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Tag} from '../../classes/tag';

@Component({
  selector: 'app-advertisement-filter',
  templateUrl: './advertisement-filter.component.html',
  styleUrls: ['./advertisement-filter.component.scss'],
  providers:[FilterService]
})
export class AdvertisementFilterComponent implements OnInit {

  constructor(private service:FilterService) { }

  isLoaded=false;
  state="ORDER";
  filters:Filters;
  panelOpenState = false;
  advs:Advertisement[];
  tags: Tag[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 
  changeState(event)
  {
    console.log('changeStatus')
    let state2=event.target.attributes['state'].value;
    console.log(state2);
    if(state2!='ORDER')
      this.state='FREELANCE'
    else
      this.state='ORDER'
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

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
    console.log(this.tags);
    this.service.sendFilterResults(this.filters,this.tags,this.state)
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
