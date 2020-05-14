import { Component, OnInit,Input, ɵNG_INJECTABLE_DEF} from '@angular/core';
import {Order} from '../../classes/order'
import {File} from '../../classes/file'
import {OrderService} from '../services/order.service'
import { DomSanitizer } from "@angular/platform-browser";
import * as fileSaver from 'file-saver';
import {AdvertisementService1} from '../services/advertisement.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  providers:[OrderService,AdvertisementService1]
})
export class OrderItemComponent implements OnInit {

  @Input() order:Order;
  @Input() myRole:String;
  public clickRate=false;
  public ok=false;
  openResultBlock=false;
  reiting:any;
  rating1:any[]=[];
  rating2:any[]=[];
  statusTranslate;
  coverImage:any;
  nextStatusTranslate;
  allFiles:File[]=[];
  allNames:any[]=[]
  deleteNames:String[]=[];


  constructor(private service:OrderService,
    private service2:AdvertisementService1, private sanitizer: DomSanitizer) { }

    download(key:String,docName:String)
    {
      let name:String=key.split('_')[1];
      let fileType:any;
      if(name.split('.')[1]=='pdf')
      fileType='application/pdf; charset=utf-8';
      else
        fileType='image/jpg; charset=utf-8';
      this.service2.downloadFile(key)
        .subscribe(
          (response) => {
            let blob:any = new Blob([response.blob()], { type:fileType});

            fileSaver.saveAs(blob,docName);
          },
          error => console.log('Error downloading the file')
        )
  }

  downloadCoverImage(key:String)
  {

    this.service2.downloadFile(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          this.coverImage=URL.createObjectURL(blob)
          this.coverImage=this.sanitizer.bypassSecurityTrustUrl(this.coverImage);
        },
         error => console.log('Error')
      )

  }

  ngOnInit() {
    this.downloadCoverImage(this.order.advertisement.coverImageKey)
    console.log(this.order)
    if(this.order.starsForWork!=0)
        {

          for(let i=0;i<this.order.starsForWork;i++)
            this.rating1.push(1);

            for(let i=5;i>this.order.starsForWork;i--)
            this.rating2.push(1);

        }
  }

  raitingClick(event)
  {
    
    this.reiting=event.target.attributes.value.value;
  }

 
  deleteClickEvent(key){
     console.log(key)
     console.log(this.deleteNames.indexOf(key))
    if(this.deleteNames.indexOf(key)==-1)
        this.deleteNames.push(key);
    else
    {
      let index=this.deleteNames.indexOf(key);
      this.deleteNames.splice(index,1)
    }
    console.log(this.deleteNames)
  }
  getStatus(status){
        if(status=='ACCEPTED')
          return 'Принят';
        if(status=="INPROGRESS")
          return 'В процессе';
        if(status=='СOMPLETED')
          return 'Завершен'
  }

  getNextStatus(status){

    if(status=="INPROGRESS")
      return 'Начать работу';
    if(status=='СOMPLETED')
      return 'Завершить'
}


  getOrder()
  {
    this.service.getOrder(this.order.orderId)
    .subscribe(
      (data:Order)=>
      {this.order=data
        console.log(data)
        this.rating1=[]
        this.rating2=[]
        if(this.order.starsForWork!=0)
        {

          for(let i=0;i<this.order.starsForWork;i++)
            this.rating1.push(1);

            for(let i=5;i>this.order.starsForWork;i--)
            this.rating2.push(1);

        }
      },
      error=>console.log(error)
    )
  }
  show()
  {
    this.ok=true;
    this.clickRate=true
  }
  changeOrderStatus(order:Order)
  {
    /*
    if(order.nextStatus!='СOMPLETED' && this.openResultBlock==false)
    {
       this.service.changeOrderStatus(this.order)
        .subscribe(
        (data)=>{this.getOrder()},
        (error)=>console.log(error)
        )
    }    
    else
    {
      if(this.openResultBlock==false)
        this.openResultBlock=true;
      else
        this.completeOrder()
    }

    */

   this.service.changeOrderStatus(this.order)
   .subscribe(
     (data)=>{this.getOrder()},
     (error)=>console.log(error)
   )
  }

  sendAttachments()
  {
    if(this.openResultBlock==false)
     this.openResultBlock=true;
   else
    this.completeOrder() 
  }


  completeOrder()
  {
    this.service.completeOrder(this.order.orderId,this.allFiles)
        .subscribe(
          (data)=>{this.getOrder(),this.openResultBlock=false},
          (error)=>console.log(error)
        )

  }
  sendFeedBack(order:Order)
  {
    console.log(order);
    this.service.sendFeedBack(this.reiting,order)
        .subscribe(
          data=>{this.ok=false,this.getOrder(),this.clickRate=false},
          error=>{console.log(error),this.ok=false;this.clickRate=false}
        )
  }

  handleFileInput(file: FileList) {
    console.log("files");
    console.log(file);
    for(let i=0;i<file.length;i++)
    {
      let newfile:File=new File(); 
      newfile.contentType=file.item(i).type;
      newfile.name=file.item(i).name;
      this.allNames.push(file.item(i).name);
       this.readFile(file.item(i),newfile);
    }
    
    console.log(this.allFiles);
  }
  
  deleteImageFromList(index)
  {
    this.allNames.splice(index,1);
    this.allFiles.splice(index,1);
  }

  readFile(file,newfile:File)
  {
    let reader;
    reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       newfile.content=reader.result;
       this.allFiles.push(newfile);
    }; 
  }
  
}


