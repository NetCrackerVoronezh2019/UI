import { Component, OnInit } from '@angular/core';
import {Subject} from '../../classes/subject';
import {SubjectService} from './Services/subjectService.service'

@Component({
  selector: 'app-subject-control',
  templateUrl: './subject-control.component.html',
  styleUrls: ['./subject-control.component.scss'],
  providers:[SubjectService]
})
export class SubjectControlComponent implements OnInit {

  subjects:Subject[];
  load=false;
  editedSubject:Subject;
  isEdit=false;
  displayedColumns: string[] = ['translateName','action'];
  message;
  constructor(private service:SubjectService) { }

  ngOnInit() {
    this.getSubjects();
  }
  getSubjects(){
    this.service.getSubjects()
    .subscribe(
      (data:Subject[])=>{this.subjects=data; console.log(this.subjects);this.load=true},
      error=>console.log(error)
    )
  }

  edit(){
    this.service.editSubject()
      .subscribe(
        (data)=>{this.isEdit=false,this.getSubjects()},
        error=>console.log(error)
      )
  }

  submit()
  {
    console.log("Send Data");
    this.service.sendNewSubject()
    .subscribe(
      (data)=>{
        console.log(data),
        console.log("OK"); 
        this.getSubjects(),
       setTimeout(()=>{   
         this.message ='Успешно';
        }, 3000)
    },
      (error)=>{
        setTimeout(()=>{   
          this.message ='Ошибка';
          }, 3000)
      },
      
    )
  }

  setEditElement(subject:Subject)
  {
    this.editedSubject=subject;
    this.isEdit=true;
    this.service.setFormControl(subject.id,subject.translateName)
  }
}
