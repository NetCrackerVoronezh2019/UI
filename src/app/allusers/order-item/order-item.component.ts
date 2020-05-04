import { Component, OnInit,Input, ɵNG_INJECTABLE_DEF} from '@angular/core';
import {Order} from '../../classes/order'
import {OrderService} from '../services/order.service'
import { DomSanitizer } from "@angular/platform-browser";
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
  reiting:any;
  rating1:any[]=[];
  rating2:any[]=[];
  statusTranslate;
  coverImage:any;
  nextStatusTranslate;



  constructor(private service:OrderService,
    private service2:AdvertisementService1, private sanitizer: DomSanitizer) { }


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
  changeOrderStatus()
  {
    console.log(this.order);
    this.service.changeOrderStatus(this.order)
    .subscribe(
      (data)=>{this.getOrder()},
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

}
