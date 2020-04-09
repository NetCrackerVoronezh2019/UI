import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../services/advertisement.service';
import { Router} from '@angular/router';
import {Subject} from '../../classes/subject';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Tag} from '../../classes/tag';
import { read } from 'fs';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers:[AdvertisementService]
})



export class AddAdvertisementComponent implements OnInit {

  subjects:Subject[];
  allFiles:any[]=[];
  tags: Tag[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  constructor(private advService:AdvertisementService,private router:Router) { }

  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    // Reset the input value
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
	   this.advService.getSubjects()
   .subscribe(
     (data:Subject[])=>{this.subjects=data; console.log(this.subjects)},
     error=>console.log(error)
   )
   
  }

  handleFileInput(file: FileList) {
  
     for(let i=0;i<file.length;i++)
     {
        this.readFile(file.item(i));
     }
    console.log(this.allFiles);
     
    }
    
    readFile(file)
    {
      let reader;
      reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.allFiles.push(reader.result);
      }; 
    }
  

  onSubmit()
  {
    this.advService.sendData(this.tags,this.allFiles)
     .subscribe(
      (data:any) => this.router.navigate(['/']),
      (error:any) => console.log(error) 
   );
   
   
  }



}
