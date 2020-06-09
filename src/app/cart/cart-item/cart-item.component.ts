import { Component, OnInit, Input } from '@angular/core';
import {CartItem} from '../../сlasses/cartItem'


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor() { }

  @Input() cartItem;
  ngOnInit() {
  }

  minusCount()
  {
    this.cartItem.count-=1;
    if(this.cartItem.count<=0)
      this.deleteItem();
    this.saveInLocalStorage();
  }

  deleteItem()
  {
    console.log("DeleteItem");
    let itemsInCart:CartItem[]=JSON.parse(localStorage.getItem ("itemsInCart"));
    let index=itemsInCart.findIndex(i=>i.item.id=this.cartItem.id);
    itemsInCart.splice(index,1);
    localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
    this.cartItem=undefined;
  }
  plusCount()
  {
    this.cartItem.count+=1;
    this.saveInLocalStorage();
  }


  saveInLocalStorage()
  {
    let itemsInCart:CartItem[]=JSON.parse(localStorage.getItem ("itemsInCart"));
    let index=itemsInCart.findIndex(i=>i.item.id=this.cartItem.id);
    itemsInCart.splice(index,1);
    itemsInCart.push(this.cartItem);
    localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
  }
  getTotalPrice()
  {
    return this.cartItem.count * this.cartItem.item.price;
  }
}
