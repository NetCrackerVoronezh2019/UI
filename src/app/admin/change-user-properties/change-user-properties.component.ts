import { Component, OnInit } from '@angular/core';
import {ChangeUserProp} from '../change-user-properties/services/changeUserProp.service'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-change-user-properties',
  templateUrl: './change-user-properties2.component.html',
  styleUrls: ['./change-user-properties.component.scss'],
  providers:[ChangeUserProp]
})
export class ChangeUserPropertiesComponent implements OnInit {

  allUsers:any;
  list:MatTableDataSource<any>;
  changingUser:any;

  displayedColumns: string[] = ['userId', 'firstname', 'lastname', 'email','isActivate','role','actions'];
  constructor(private service:ChangeUserProp) {
    this.getAllUsers();
   }

   applyFilter(filterValue: string) {
    this.list.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getAllUsers();
  }
  
  openEditForm(row)
  {
    this.service.setDefaultValuesForEditForm(row);	  
  }

  Edit()
  {
    this.service.changeUserProperties()
    .subscribe(
      data=>{
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
      data=>{
		  this.allUsers=data;
		  this.list=new MatTableDataSource(this.allUsers);
	  },
      error=>console.log(error)
    )
  }
}
