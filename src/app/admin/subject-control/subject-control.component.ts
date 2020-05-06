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
  displayedColumns: string[] = ['name','translateName'];
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

  Submit()
  {
    console.log("Send Data");
    this.service.sendNewSubject()
    .subscribe(
      (data)=>{console.log(data),this.getSubjects()},
      (error)=>console.log(error)
    )
  }
}
