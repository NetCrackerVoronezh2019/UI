import { Component, OnInit,Input} from '@angular/core';
import {ChangeService} from './change.service'
import {File} from '../../classes/file'
import {Subject} from '../../classes/subject'
import {CertificateFile} from '../../classes/certificateFile'
import {User} from '../../classes/user';

@Component({
  selector: 'app-change-properties',
  templateUrl: './change-properties.component.html',
  styleUrls: ['./change-properties.component.scss'],
  providers:[ChangeService]
})
export class ChangePropertiesComponent implements OnInit {

  @Input() user:User;
  isValid=true;
  @Input() role;
  public allFiles:File[]=[];
  public allNames:any[]=[]
  public certificateFiles:CertificateFile[]=[];
  public subjects:Subject[];
  sendData:Boolean=false;
  checkEmailMessage;
  yearMessage;
  currentIndex;
  forNgModel="";
  changeResultMessage;
  
  constructor(private regService:ChangeService) { }

  ngOnInit() {
    this.certificateFiles.push(new CertificateFile());
    this.getAllSubjects();
    this.regService.setFormValues(this.user);
    this.role=this.user.roleName;
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
    if(this.regService.getRegForm().invalid)
    {
      this.isValid=false;
    }
    else
    {
      this.isValid=true;
      this.regService.changeInfo(this.user.userId)
        .subscribe(
          (data)=>this.changeResultMessage="Изменения сохранены",
          error=>this.changeResultMessage="Ошибка ("
        )
    }
  }
  /* 
  onSubmit()
  {   
      console.log(this.certificateFiles)
      this.checkEmailMessage='';
          (data:Boolean)=>{
            if(!this.regService.getRegForm().invalid)
            {
              this.sendData=true;
              this.isValid=true;
              this.regService.sendRegistrationInformation(this.role,this.certificateFiles) 
              .subscribe(
                  data => {
                    console.log(data)
                   // this.router.navigate(['/email/'+this.regService.getRegForm().value.userEmail]);
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

        )
  }
*/
  
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
