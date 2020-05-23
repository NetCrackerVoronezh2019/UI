import { Component, OnInit } from '@angular/core';
import {UserPageService} from './userpage.service'
import {User} from '../classes/user'
import {Subscription} from 'rxjs'
import { ActivatedRoute} from '@angular/router';
import {Order} from '../classes/order'
import {Advertisement} from '../classes/advertisement'
import * as fileSaver from 'file-saver';
import {GetFile} from '../classes/getFile'
import {File} from '../classes/file'
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { Group } from '@UserAndGroupClasses/group'
import { User as UserAndGroupsUser } from '@UserAndGroupClasses/user'
import {AdvNotification} from '../classes/advNotification'
import {AdvertisementService1} from '../allusers/services/advertisement.service'
import {UserDocument} from '../classes/userDocument'


@Component({
  selector: 'app-userpage2',
  templateUrl: './userpage2.component.html',
  styleUrls: ['./userpage2.component.scss'],
  providers:[UserPageService,AdvertisementService1]
})
export class Userpage2Component implements OnInit {

  public user:User
  id:Number;
  myId:Number;
  checkFeedBack=false;
  checkAdv=false;
  checkFriends = false;
  checkGroups = false;
  checkAboutMe=false;
  checkDocuments=false;
  checkRequests=false;
  genderTranslate;
  subscription:Subscription;
  dataSource:Order[]=[];
  advs:Advertisement[]=[];
  public allFiles:File[]=[];
  public allNames:any[]=[]
  public validSubjects:String[]=[]
  public notifications:AdvNotification[]=[];
  profileImage:any;
  profileImageUploaded=false;
  profileImageUploadMessage;
  loading=false;
  loadingError=false;
  displayedColumns: string[] = ['orderId', 'freelancerId', 'advertisementId',
  'advertisementName','status','rating'];
  friendStatus = "";
  friends:UserAndGroupsUser[];
  groups:Group[];
  public feed:Order[]=[];
  public getFB=true;
  documents:UserDocument[]=[];
  constructor(private service:UserPageService,private activateRoute: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer,private advService:AdvertisementService1) { }


  ngOnInit() {
    this.subscription=this.activateRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.getAllValidSubjects(this.id)
      this.getUserData(this.id);
      this.initVariagles()
      this.getMyId();
    } )
  }

  

  getAllValidSubjects(id)
  {
    this.service.getAllValidSubjects(id)
        .subscribe(
          (data:String[])=>{this.validSubjects=data,console.log(this.validSubjects)},
          error=>console.log(error)
        )
  }

  closeEditModal()
  {
    this.getUserData(this.id);
  }
  onAccept(x:AdvNotification)
  {
    x.notification.responseStatus="ACCEPTED";
    console.log(x);
    this.advService.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getNotifications(),
      error=>console.log(error)
    )

    

  }

  onReject(x:AdvNotification)
  {
    x.notification.responseStatus="REJECTED";
    console.log(x);
    this.advService.sendNotificationResponse(x)
    .subscribe(
      (data)=>this.getNotifications,
      error=>console.log(error)
    ) 
  }

  getNotifications()
  {
    this.service.getNotifications(this.id)
      .subscribe(
        (data:AdvNotification[])=>{this.notifications=data,console.log(this.notifications)},
        error=>console.log(error)
      )
  }
  getFeedBack()
  {
    this.checkFeedBack=true;
    this.checkAdv=false;
    this.checkGroups = false;
    this.checkFriends = false;
    this.checkAboutMe=false;
    this.checkDocuments=false;
    this.checkRequests=false;
    this.service.getFeedBack(this.id)
      .subscribe(
        (data:Order[])=>{this.feed=data,this.getFB=true,console.log(this.feed)},
        error=>console.log(error)
      )
  }

  gender()
  {
    if(this.user.gender=="MALE")
      return 'Мужской'
    if(this.user.gender=="FEMALE")
    return 'Женский'
  }

  role()
  {
   
    if(this.user.roleName=="ROLE_STUDENT")
      return 'студент'
    if(this.user.roleName=="ROLE_TEACHER")
    return 'Преподaватель'
  }
  checkDocumentsEvent()
  {
    this.checkFeedBack=false;
    this.checkAdv=false;
    this.checkGroups = false;
    this.checkRequests=false;
    this.checkFriends = false;
    this.checkAboutMe=false;
    this.checkDocuments=true;
    this.service.getAllValidDocuments(this.user.userId)
        .subscribe(
          (data:UserDocument[])=>{this.documents=data,console.log(this.documents)},
          error=>console.log(error)
        )
  }

  checkRequestEvent()
  {
    this.checkFeedBack=false;
    this.checkAdv=false;
    this.checkGroups = false;
    this.checkRequests=true;
    this.checkFriends = false;
    this.checkAboutMe=false;
    this.checkDocuments=false;
    this.getNotifications()

  }
  checkAboutMeEvent()
  {
    this.checkFeedBack=false;
    this.checkAdv=false;
    this.checkGroups = false;
    this.checkFriends = false;
    this.checkAboutMe=true;
    this.checkDocuments=false;
    this.checkRequests=false;
  }

  getFriendStatus() {
    this.service.getYourFriends().subscribe((data:User[]) => {
      data.forEach(element => {
        if (element.userId == this.id) {
          this.friendStatus = 'friend'
        }
      });
      if (this.friendStatus == "") {
        this.service.getYourOutgoing().subscribe((data:User[]) => {
          data.forEach(element => {
            if (element.userId == this.id) {
              this.friendStatus = 'outgoing'
            }
          });
          if (this.friendStatus == "") {
            this.service.getYourIngoing().subscribe((data:User[]) => {
              data.forEach(element => {
                if (element.userId == this.id) {
                  this.friendStatus = 'ingoing'
                }
              });
              if (this.friendStatus == "") {
                this.friendStatus = "none"
              }
            })
          }
        })
      }
    })
  }

  addFriend() {
    this.service.addFriend(this.id).subscribe(data => {
      if (this.friendStatus == "none") {
        this.friendStatus = "outgoing";
      } else if (this.friendStatus == "ingoing") {
        this.friendStatus = "friend";
      }
    })
  }

  removeFriend() {
    this.service.removeFriend(this.id).subscribe(data => {
      if (this.friendStatus == "friend") {
        this.friendStatus = "ingoing";
      } else if (this.friendStatus == "outgoing") {
        this.friendStatus = "none";
      }
    })
  }

  checkFriendsEvent() {
    this.checkAdv = false;
    this.checkFeedBack = false;
    this.checkGroups = false;
    this.checkFriends = true;
    this.checkAboutMe=false;
    this.checkDocuments=false;
    this.checkRequests=false;
    this.service.getFriends(this.id).subscribe((data:UserAndGroupsUser[]) => {
      this.friends = data;
    })
  }

  checkGroupsEvent() {
    this.checkAdv = false;
    this.checkRequests=false;
    this.checkFeedBack = false;
    this.checkGroups = true;
    this.checkFriends = false;
    this.checkAboutMe=false;
    this.checkDocuments=false;
    this.service.getUserGroups(this.id).subscribe((data:Group[]) => {
      this.groups = data;
      console.log(data);
    })
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

  downloadProfileImage(key:String)
  {

    if(this.user.userImageKey!=undefined)
    {
      this.service.downloadProfileImage(key)
        .subscribe(
          (response) => {
            let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
            this.profileImage=URL.createObjectURL(blob)
            this.profileImage=this.sanitizer.bypassSecurityTrustUrl(this.profileImage);
            this.loading=true;
            console.log(this.loading);
          },
          error => {console.log('Error'),this.loadingError=true}
        )
    }
    else{
      this.loadingError=true;
    }

  }

  
  close()
  {
    this.profileImageUploaded=false;

  }

  upload()
  {
    this.service.updateImage(this.allFiles[0])
      .subscribe(
        (data)=>{
         this.getUserData(this.id),this.profileImageUploaded=true; 
          this.profileImageUploadMessage="Всё прошло успешно !",
        this.allNames=[]},
        error=>{console.log(error),this.profileImageUploaded=true; this.profileImageUploadMessage="Oшибка :("}
      )
  }

  checkAdvEvent()
  {
    this.checkAdv=true;
    this.checkFeedBack = false;
    this.checkGroups = false;
    this.checkFriends = false;
    this.checkAboutMe=false;
    this.checkRequests=false;
    this.checkDocuments=false;
    this.service.getAllAdvertisements(this.id)
        .subscribe(
          (data:Advertisement[])=>{this.advs=data;console.log(data)},
          error=>console.log(error)
        )
  }

  getUserData(id:Number)
  {
    this.service.getUserData(id)
        .subscribe(
          (data:User)=>{this.user=data,console.log(this.user), this.downloadProfileImage(this.user.userImageKey)},
          (error)=>console.log(error)
        )
  }

  initVariagles() {
    this.checkFeedBack = false;
    this.checkAdv = false;
    this.checkFriends = false;
    this.checkGroups = false;
    this.checkAboutMe=false;
    this.checkDocuments=false;
    this.checkRequests=false;
    this.friendStatus = ""
  }

  getMyId()
  {
    this.service.getMyId()
        .subscribe(
          (data:Number)=> {
            this.myId=data
            if (this.myId != this.id) {
              this.getFriendStatus();
            }
          },
          error=>console.log(error)
        )
  }

  handleFileInput(file: FileList) {
       let reader;
       let newfile:File=new File();
       this.allNames.push(file.item(0).name);
       newfile.contentType=file.item(0).type;
       newfile.name=file.item(0).name;
       reader=new FileReader();
       reader.readAsDataURL(file.item(0));
       reader.onload = () => {
        newfile.content=reader.result
        this.allFiles.push(newfile);
      };
      console.log(this.allFiles);
  }

  deleteImageFromList(index)
  {
    this.allNames.splice(index,1);
    this.allFiles.splice(index,1);
  }

  startDialogWithUser() {
    this.service.startDialogWithUser(this.id).subscribe((data:number) => {
      this.router.navigate(['dialog/' + data]);
    })
  }

}
