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
  constructor(public regService:RegistrationService,private router:Router) {
  
  }
  ngOnInit() {
    
  }

  onSubmit()
  {
    if(!this.regService.getRegForm().invalid)
    {
      alert("send a data");
      this.regService.sendRegistrationInformation(this.role)
      .subscribe(
          data => {
            this.router.navigate(['/']);
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
    let reader = new FileReader();
    let uploadfile = file.item(0);

    reader.readAsDataURL(uploadfile);
      reader.onload = () => {
        this.regService.getRegForm().get("userImg").setValue({
          filename: uploadfile.name,
          filetype: uploadfile.type,
          value: reader.result
        })
      };
  }
 
}
