import { Component, OnInit } from '@angular/core';
import {UserDocument} from '../../classes/userDocument'
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

  constructor(private service:DocumentService) { }

  displayedColumns: string[] = ['userId', 'userFIO', 'document','action'];
  dataSource:MatTableDataSource<any>;
  message:String;
  check="valid";
  sended=false;
  userDocumentLive:UserDocument;

  ngOnInit() {

    this.getValid();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getValid()
  {
    this.check="valid"
    console.log("getvalid");
    this.service.getAllValidDocuments()
        .subscribe(
          (data:UserDocument[])=>this.dataSource=new MatTableDataSource(data),
          error=>console.log(error)

        )
  }

  getUnValid()
  {

    this.check="unValid";
    console.log("getunvalid");
    this.service.getAllUnValidDocuments()
        .subscribe(
          (data:UserDocument[])=>this.dataSource=new MatTableDataSource(data),
          error=>console.log(error)

        )     
  }

  checkIconEvent(row:UserDocument)
  {
    this.sended=false;
    this.message="Документ является действительным ?";
    this.userDocumentLive=row;
  }

  banIconEvent(row:UserDocument)
  {
    this.sended=false;
    this.message="Документ не является действительным ?";
    this.userDocumentLive=row;
  }

  submit()
  {
    console.log("sumit")
    this.service.changeDocumentValidaton(this.userDocumentLive)
    .subscribe(
      data=>{
        this.sended=true;
        this.message="Всё прошло успешно"
        if(this.check=="valid")
        {
          this.getValid();
        }
        else
          this.getUnValid();
      },
      error=>{this.message="Ошибка"; console.log(error)}
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
