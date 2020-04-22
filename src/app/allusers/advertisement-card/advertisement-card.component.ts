import { Component, Input,OnInit } from '@angular/core';
import {Advertisement} from '../../classes/advertisement'
import { DomSanitizer } from "@angular/platform-browser";
import {AdvertisementService1} from '../services/advertisement.service';
@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss'],
  providers:[AdvertisementService1]
})
export class AdvertisementCardComponent implements OnInit {

  @Input() adv:Advertisement;
  coverImage:any;
  constructor(private service:AdvertisementService1, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.adv!=undefined)
      this.downloadCoverImage(this.adv.coverImageKey);
  }

  downloadCoverImage(key:String)
  {

    this.service.downloadFile(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          this.coverImage=URL.createObjectURL(blob)
          this.coverImage=this.sanitizer.bypassSecurityTrustUrl(this.coverImage);
          //this.loading=true;
        //  console.log(this.loading);
        },
         error => console.log('Error')
      )

  }

}
