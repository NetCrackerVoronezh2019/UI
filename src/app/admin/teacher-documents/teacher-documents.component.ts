import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user'
import {MatTableDataSource} from '@angular/material/table'
import {DocumentService} from './document.service';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-teacher-documents',
  templateUrl: './teacher-documents.component.html',
  styleUrls: ['./teacher-documents.component.scss'],
  providers:[DocumentService]
})
export class TeacherDocumentsComponent implements OnInit {

  users:User[]=[]
  constructor(private service:DocumentService) { }

    ngOnInit()
    {
      this.getAllTeachers();         
    }

    getAllTeachers(){
      this.service.getAllTeachers()
          .subscribe(
            (data:User[])=>{this.users=data,console.log(this.users)},
            error=>console.log(error)
          )
    }



  download(key:String)
  {
    let name:String=key.split('_')[1];
    let fileType:any;
    if(name.split('.')[1]=='pdf')
    fileType='application/pdf; charset=utf-8';
    else
      fileType='image/jpg; charset=utf-8';
    this.service.downloadFile(key)
      .subscribe(
        (response) => {
          let blob:any = new Blob([response.blob()], { type:fileType});

          fileSaver.saveAs(blob,name);
        },
         error => console.log('Error downloading the file')
      )
  }
}
