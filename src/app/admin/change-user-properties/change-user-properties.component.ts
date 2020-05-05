import { Component, OnInit } from '@angular/core';
import {ChangeUserProp} from '../change-user-properties/services/changeUserProp.service'
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../classes/user'
@Component({
  selector: 'app-change-user-properties',
  templateUrl: './change-user-properties2.component.html',
  styleUrls: ['./change-user-properties.component.scss'],
  providers:[ChangeUserProp]
})
export class ChangeUserPropertiesComponent implements OnInit {

  allUsers:User[];
  list:MatTableDataSource<any>;
  changingUser:any;
  clicked=false;

  displayedColumns: string[] = ['userId', 'firstname', 'lastname', 'email','isActivate','isDeleted','role','actions'];
  constructor(private service:ChangeUserProp) {
    this.getAllUsers();
   }

   filterUsers()
   {
     this.service.filterUsers("ArmenJan")
        .subscribe(
          (data:User[])=>
        {this.allUsers=data
          console.log(data);
        },
          error=>console.log(error)
        )
   }

  ngOnInit() {
    this.getAllUsers();
  }

  showModel()
  {
    this.clicked=true;
  }
  
  openEditForm(row)
  {
    this.service.setDefaultValuesForEditForm(row);	  
    this.clicked=true;
  }
  
  deleteUser(row)
  {
    this.service.deleteUser(row)
    .subscribe(
      data=>{},
      error=>console.log(error)
    )
  }

  Edit()
  {
    
    this.service.changeUserProperties()
    .subscribe(
      (data:User[])=>{
			  this.allUsers=data; 
        this.filterUsers();
        
		  },
      error=>console.log(error)
    )
    
  }

  getGender(gender)
  {
    if(gender=='MALE')
      return 'Мужской'
      if(gender=='FEMALE')
      return 'Женский'
  }

  getStatus(status)
  {
    if(status==true)
      return 'Активный'
    if(status=false)
      return 'Неактивный' 
  }

  getRole(role)
  {
    if(role=='ROLE_TEACHER')
    return 'Преподаватель'
   if(role=='ROLE_STUDENT')
    return 'Студент'
    if(role=='ROLE_ADMIN')
    return 'Администратор'  
  }

  getAllUsers()
  {
    this.service.getAllUsers()
    .subscribe(
      (data:User[])=>{
		  this.allUsers=data;
		  console.log(data);
		  this.list=new MatTableDataSource(this.allUsers);
	  },
      error=>console.log(error)
    )
  }
}
