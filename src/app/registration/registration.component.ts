import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {RegistrationService} from './Services/registration.service';
import {MatInputModule} from '@angular/material/input';
import { Router} from '@angular/router';
import {File} from '../classes/file' 
import {Subject} from '../classes/subject'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})

export class RegistrationComponent implements OnInit {
  role="STUDENT";
  public allFiles:File[]=[];
  public allNames:any[]=[]
  public subjects:Subject[];
  sendData:Boolean=false;
  isValid=true;
  checkEmailMessage;
  constructor(public regService:RegistrationService,private router:Router) {
  
  }
  ngOnInit() {
    this.getAllSubjects()
  }

  onSubmit()
  {   
      
      this.checkEmailMessage='';
      this.regService.checkEmail()
        .subscribe(
          (data:Boolean)=>{
            if(data==false && !this.regService.getRegForm().invalid)
            {
              this.sendData=true;
              this.isValid=true;
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
              if(data==true)
              {
                this.checkEmailMessage="Email уже существует";
              }
              this.isValid=false;

              console.log("isValid" + this.isValid)
            }
          },
          error=>this.isValid=false
        )
  }

  
  setRole(someobject)
  {
    let myRole=someobject.target.attributes['role'].value
    console.log(myRole);
    this.role=myRole;
  }

  handleFileInput(file: FileList) {
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

  deleteImageFromList(index)
  {
    this.allNames.splice(index,1);
    this.allFiles.splice(index,1);
  }

  getAllSubjects()
  {
    this.regService.getSubjects()
        .subscribe(
          (data:Subject[])=>{this.subjects=data, console.log(this.subjects)},
          error=>console.log(error)          
        )
  }
 
}
