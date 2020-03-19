import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../services/advertisement.service';
import {Subject} from '../../classes/subject';
@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers:[AdvertisementService]
})
export class AddAdvertisementComponent implements OnInit {

  subjects:Subject[];
  constructor(private advService:AdvertisementService) { }

  ngOnInit() {
	   this.advService.getSubjects()
   .subscribe(
     (data:Subject[])=>{this.subjects=data; console.log(this.subjects)},
     error=>console.log(error)
   )
   
  }

  handleFileInput(file: FileList) {
    let reader = new FileReader();
    let uploadfile = file.item(0);

    reader.readAsDataURL(uploadfile);
      reader.onload = () => {
        console.log(reader.result);
        this.advService.getAdvForm().get("image").setValue({
          filename: uploadfile.name,
          filetype: uploadfile.type,
          value: reader.result
        })
      };
    }
    
  

  onSubmit()
  {
    this.advService.sendData()
     .subscribe(
      (data:any) => console.log(data),
      (error:any) => console.log(error) 
   );
   
  }



}
