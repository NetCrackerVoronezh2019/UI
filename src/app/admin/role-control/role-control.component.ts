import { Component, OnInit } from '@angular/core';
import {RoleService} from './Services/roleService.service'
import {Role} from '../../classes/role'

@Component({
  selector: 'app-role-control',
  templateUrl: './role-control.component.html',
  styleUrls: ['./role-control.component.scss'],
  providers:[RoleService]
})
export class RoleControlComponent implements OnInit {

  roles:Role[];
  displayedColumns: string[] = ['roleId', 'roleName'];
  constructor(private service:RoleService) { }

  ngOnInit() {
    this.service.getRoles()
    .subscribe(
      (data:Role[])=>{this.roles=data; console.log(this.roles)},
      error=>console.log(error)
    )
  }
  Submit()
  {
    this.service.sendRoleName()
    .subscribe(
      (data)=>{
			this.service.getRoles()
			.subscribe(
			  (data:Role[])=>{this.roles=data; console.log(this.roles)},
			  error=>console.log(error)
    )
	  },
      error=>console.log(error)
    )
  }

  s
}
