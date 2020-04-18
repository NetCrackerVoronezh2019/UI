import { Component, OnInit } from '@angular/core';
import {UserPageService} from './userpage.service'
import {User} from '../classes/user'
import {Subscription} from 'rxjs'
import { ActivatedRoute} from '@angular/router';
import {Order} from '../classes/order'
import {Advertisement} from '../classes/advertisement'

@Component({
  selector: 'app-userpage2',
  templateUrl: './userpage2.component.html',
  styleUrls: ['./userpage2.component.scss'],
  providers:[UserPageService]
})
export class Userpage2Component implements OnInit {

  private user:User
  id:Number;
  myId:Number;
  checkOrder=false;
  checkAdv=false;
  subscription:Subscription;
  dataSource:Order[]=[];
  advs:Advertisement[]=[];
  public allFiles:any[]=[];
  public allNames:any[]=[]
  displayedColumns: string[] = ['orderId', 'freelancerId', 'advertisementId',
  'advertisementName','status','rating'];
  constructor(private service:UserPageService,private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription=this.activateRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.getUserData(this.id);
      this.getMyId();
    } )
  }


  checkOrderEvent()
  {
    this.checkOrder=true;
    this.checkAdv=false;
    this.service.getOrders(this.id)
      .subscribe(
        (data:Order[])=>{this.dataSource=data,console.log(data)},
        error=>console.log(error)
      )
  }


  upload()
  {
    this.service.updateImage(this.allFiles[0])
      .subscribe(
        (data)=>this.getUserData(this.id),
        error=>console.log(error)
      )
  }

  checkAdvEvent()
  {
    this.checkAdv=true;
    this.checkOrder=false;
    this.service.getAllAdvertisements(this.id)
        .subscribe(
          (data:Advertisement[])=>this.advs=data,
          error=>console.log(error)
        )
  }

  getUserData(id:Number)
  {
    this.service.getUserData(id)
        .subscribe(
          (data:User)=>{this.user=data,console.log(this.user)},
          (error)=>console.log(error)
        )
  }

  getMyId()
  {
    this.service.getMyId()
        .subscribe(
          (data:Number)=>this.myId=data,
          error=>console.log(error)
        )    
  }

  handleFileInput(file: FileList) {
    
    let reader;
       this.allNames.push(file.item(0).name);
       reader=new FileReader();
       reader.readAsDataURL(file.item(0));
       reader.onload = () => {
        this.allFiles.push(reader.result);
      }; 
  }

  deleteImageFromList(index)
  {
    this.allNames.splice(index,1);
    this.allFiles.splice(index,1);
  }

}
