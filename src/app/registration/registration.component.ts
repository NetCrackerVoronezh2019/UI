import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {RegistrationService} from './Services/registration.service';
import {MatInputModule} from '@angular/material/input';
import { Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})

export class RegistrationComponent implements OnInit {
  role="STUDENT";
  public allFiles:any[]=[];
  public allNames:any[]=[]
  sendData:Boolean=false;
  constructor(public regService:RegistrationService,private router:Router) {
  
  }
  ngOnInit() {
    
  }

  onSubmit()
  {
    if(!this.regService.getRegForm().invalid)
    {
      this.sendData=true;
      this.regService.sendRegistrationInformation(this.role,this.allFiles) 
      .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['/email/'+this.regService.getRegForm().value.userEmail]);
          },
          error => console.log(error)
      );
    
    
  }
    else
    {
      alert("dont send a data");
    }

  }

  setRole(someobject)
  {
    let myRole=someobject.target.attributes['role'].value
    console.log(myRole);
    this.role=myRole;
  }

  handleFileInput(file: FileList) {
    
    let reader;
     for(let i=0;i<file.length;i++)
     {
       this.allNames.push(file.item(i).name);
       reader=new FileReader();
       reader.readAsDataURL(file.item(i));
       reader.onload = () => {
        this.allFiles.push(reader.result);
      }; 
     }
      console.log(this.allNames);
     
  }

  deleteImageFromList(index)
  {
    console.log(index);
  }
 
}
