import { Component, OnInit } from '@angular/core';
import {CreateService} from '../../services/createItem.service'

@Component({
  selector: 'app-create-new-item',
  templateUrl: './create-new-item.component.html',
  styleUrls: ['./create-new-item.component.scss'],
  providers:[CreateService]
})
export class CreateNewItemComponent implements OnInit {

  constructor(private service:CreateService) { }

  S = false;
  M = false;
  XXL=false;
  XXXL=true;
  red=false;
  public black=true;
  white=false;
  yellow=false;
  
  ngOnInit() {
  }

  onSubmit(){
    let colors:String[]=this.getTrueColors();
    let sizes:String[]=this.getTrueSizes();
    this.service.sendInformation(colors,sizes)
  }

  getTrueColors()
  {

    let sizes:String[]=[];
    if(this.S==true)
      sizes.push("S")
    if(this.M==true)
      sizes.push("M")
    if(this.XXL==true)
      sizes.push("XXL")
    if(this.XXXL==true)
      sizes.push("XXXL")

    return sizes;
  }

  getTrueSizes()
  {
    let colors:String[]=[];
    if(this.red==true)
      colors.push("red")
    if(this.black==true)
      colors.push("black")
    if(this.white==true)
      colors.push("white")
    if(this.yellow==true)
      colors.push("yellow")

    return colors;
  }
}
