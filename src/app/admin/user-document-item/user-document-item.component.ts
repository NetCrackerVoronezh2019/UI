import { Component, OnInit,Input } from '@angular/core';
import {UserDocument} from '../../classes/UserDocument'
import { User } from '@MainClasses/user';
import {DocumentService} from '../teacher-documents/document.service'

@Component({
  selector: 'app-user-document-item',
  templateUrl: './user-document-item.component.html',
  styleUrls: ['./user-document-item.component.scss'],
  providers:[DocumentService]

})
export class UserDocumentItemComponent implements OnInit {

  constructor(private service:DocumentService) { }
  @Input() user:User;
  disabled=false;
  isTrue=true;
  message=''
  ngOnInit() {
  }


  getDoc()
  {
    console.log(this.user.documents);
  }

  saveUserChanges()
  {
    console.log(this.user)
    this.service.saveUserChanges(this.user)
          .subscribe(
            (data)=>{
              this.message = "Успешно!";

        setTimeout(()=>{   
            this.message ='';
            }, 3000)
            },
            (error)=>{
              this.message = "Ошибка :(";

              setTimeout(()=>{   
                  this.message ='';
                  }, 3000)
            }
          )
  }
}
