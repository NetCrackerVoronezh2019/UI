import { Component, OnInit,NgModule} from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {RegistrationService} from './Services/registration.service';
import {MatInputModule} from '@angular/material/input';
import { Router} from '@angular/router';
import {File} from '../classes/file' 
import {Subject} from '../classes/subject'
import {CertificateFile} from '../classes/certificateFile'

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
  public certificateFiles:CertificateFile[]=[]
  public subjects:Subject[];
  sendData:Boolean=false;
  isValid=true;
  checkEmailMessage;
  yearMessage;
  currentIndex;
  forNgModel="";
  constructor(public regService:RegistrationService,private router:Router) {
  
  }
  ngOnInit() {
    this.certificateFiles.push(new CertificateFile());
    this.getAllSubjects()
  }

  addSection()
  {
    this.certificateFiles.push(new CertificateFile());
  }


  dateEvent(event)
  {
    let year=this.regService.getRegForm().value.birthDate.split('-')[0];
    console.log(year);
    if(year<1950 || year>2015)
    {
       
        this.yearMessage="Год должен быть больше 1950 и меньше 2015";
    }
    else
    this.yearMessage=null;
      


  }
  onSubmit()
  {   
      console.log(this.certificateFiles)
      this.checkEmailMessage='';
      this.regService.checkEmail()
        .subscribe(
          (data:Boolean)=>{
            if(!this.regService.getRegForm().invalid)
            {
              this.sendData=true;
              this.isValid=true;
              this.regService.sendRegistrationInformation(this.role,this.certificateFiles) 
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
  
    let files=this.certificateFiles[this.currentIndex].allFiles;
    
     for(let i=0;i<file.length;i++)
     {
       let newfile:File=new File(); 
       newfile.contentType=file.item(i).type;
       newfile.name=file.item(i).name;
       this.allNames.push(file.item(i).name);
        this.readFile(file.item(i),newfile,files);
     }
     
     console.log(files);
     
  }

  readFile(file,newfile:File,files)
   {
     let reader;
     reader=new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
        newfile.content=reader.result;
        files.push(newfile);
     }; 
   }

   current(e)
   {
     if(e!=undefined)
      this.currentIndex=e;
   }
  deleteImageFromList(i,j)
  {
    console.log("deleteImage");
    console.log(i);
    console.log(j);
    this.certificateFiles[i].allFiles.splice(j,1);
  }

  sectionChange(value,i)
  {
    this.certificateFiles[i].section=value;
    console.log(value);
  }
  getAllSubjects()
  {
    this.regService.getSubjects()
        .subscribe(
          (data:Subject[])=>{this.subjects=data, console.log(this.subjects)},
          error=>console.log(error)          
        )
  }

  deleteSection(i)
  {
    this.certificateFiles.splice(i,1);
  }
 
}
