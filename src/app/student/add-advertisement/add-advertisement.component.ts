import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../services/advertisement.service';
import { Router} from '@angular/router';
import {Subject} from '../../classes/subject';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Tag} from '../../classes/tag';
import {File} from '../../classes/file' 


@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers:[AdvertisementService]
})



export class AddAdvertisementComponent implements OnInit {

  subjects:Subject[];
  allFiles:File[]=[];
  allNames:any[]=[]
  coverName:any;
  coverFile:File=new File();
  tags: Tag[] = [];
  sendData:Boolean=false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  constructor(private advService:AdvertisementService,private router:Router) { }

  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 

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
	   this.advService.getSubjects()
   .subscribe(
     (data:Subject[])=>{this.subjects=data; console.log(this.subjects)},
     error=>console.log(error)
   )
   
  }

  
  handleFileInput(file: FileList) {
    console.log("files");
    console.log(file);
    for(let i=0;i<file.length;i++)
    {
      let newfile:File=new File(); 
      newfile.contentType=file.item(i).type;
      newfile.name=file.item(i).name;
      this.allNames.push(file.item(i).name);
       this.readFile(file.item(i),newfile);
    }
    
    console.log(this.allFiles);
 }


 handleCoverFileInput(file: FileList) {
  
   console.log("coverFile");
    this.coverFile.contentType=file.item(0).type;
    this.coverFile.name=file.item(0).name;
    this.coverName=file.item(0).name;
    let coverReader;
    coverReader=new FileReader();
    coverReader.readAsDataURL(file.item(0));
    coverReader.onload = () => {
       this.coverFile.content=coverReader.result;
    }; 
     
  

  console.log(this.allFiles);
}

 readFile(file,newfile:File)
  {
    let reader;
    reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       newfile.content=reader.result;
       this.allFiles.push(newfile);
    }; 
  }
  
  

  onSubmit()
  {
    this.sendData=true;
    this.advService.sendData(this.tags,this.allFiles,this.coverFile)
      .subscribe(
        (data:any) => this.router.navigate(['/']),
        (error:any) => console.log(error) 
      );
   
   
   
  }

  deleteImageFromList(index)
  {
    this.allNames.splice(index,1);
    this.allFiles.splice(index,1);
  }

  deleteCoverImage()
  {
    this.coverName=undefined;
    this.coverFile=new File();
  }



}
