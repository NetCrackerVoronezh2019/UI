import { Component, OnInit } from '@angular/core';
import {Item} from '../сlasses/item';
import {CartItem} from '../сlasses/cartItem'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit {

  public item:Item;
  constructor() { }

  ngOnInit() {

    this.item=new Item();
    this.item.id=1;
    this.item.description='Идею данной футболки поймет любой айтишник. Это интерпретация логотипа «GitHub» под логотип одного из самых известных сайтов для взрослых.';
    this.item.name='Мужская футболка хлопок «GitHub»';
    this.item.price=1111;
    this.item.picturePath='https://storage.vsemayki.ru/images/0/1/1909/1909039/previews/people_4_manshort_front_lavender_500.jpg'
    
  }

  addInCart()
  {
    let itemsInCart:CartItem[]=[];
    let cartitem:CartItem=new CartItem();
    cartitem.item=this.item;
    cartitem.count=1;
    cartitem.size="XXL";
    itemsInCart=JSON.parse(localStorage.getItem ("itemsInCart"));
    if(itemsInCart==undefined)
        itemsInCart=[]
    itemsInCart.push(cartitem);
    localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
    console.log(itemsInCart);
  }

}
