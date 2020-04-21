import { Component, Input,OnInit } from '@angular/core';
import { Group } from '@UserAndGroupClasses/group'
import {GroupService} from "../group/Services/group.service"
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  providers: [GroupService]
})
export class GroupCardComponent implements OnInit {

  @Input() group:Group;
  groupImage:any;
  loading = false;
  constructor(private grService:GroupService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.downloadProfileImage(this.group.image)
  }


  downloadProfileImage(key:String)
  {

    this.grService.downloadGroupImage(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          this.groupImage=URL.createObjectURL(blob)
          this.groupImage=this.sanitizer.bypassSecurityTrustUrl(this.groupImage);
          this.loading = true;
        },
         error => console.log('Error')
      )

  }

}
