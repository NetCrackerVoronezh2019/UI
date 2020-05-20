import { Component, OnInit,Input} from '@angular/core';
import { Router} from '@angular/router';
import {AdvertisementService} from '../services/advertisement.service'
import {Subject} from '../../classes/subject'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Tag} from '../../classes/tag';
import {Advertisement} from '../../classes/advertisement'
import {File} from '../../classes/file' 

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class UpdateAdvertisementComponent implements OnInit {


  @Input() id:Number;
  tags: Tag[] = [];
  allFiles:File[]=[];
  allNames:any[]=[]
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  subjects:Subject;
  advertisement:Advertisement;

  constructor(private router: Router,private service:AdvertisementService) { }

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
    this.service.getExistsAdvertisement(this.id)
    .subscribe(
      (adv:Advertisement)=>{
          this.advertisement=adv;
          this.service.setFormValues(adv)
          this.tags=this.advertisement.tags;
      },
      (error)=>console.log(error)
   )
    this.service.getSubjects()
    .subscribe(
      (s:Subject)=>this.subjects=s,
      (error)=>console.log(error)
    )
  }

  onSubmit()
  {
     this.service.updateData(this.id,this.tags,this.allFiles).
    subscribe(
      (data)=>  this.router.navigate(['/']),
      (error)=>console.log(error)
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

  deleteImageFromList(index)
  {
     this.allNames.splice(index,1);
     this.allFiles.splice(index,1);
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

}
