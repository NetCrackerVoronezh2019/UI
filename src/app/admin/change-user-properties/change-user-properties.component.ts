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

   applyFilter(filterValue: string) {
    this.list.filter = filterValue.trim().toLowerCase();
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
        this.getAllUsers();
        
		  },
      error=>console.log(error)
    )
    
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
