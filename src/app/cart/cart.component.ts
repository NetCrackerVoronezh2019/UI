import { Component, OnInit } from '@angular/core';
import {Item} from '../сlasses/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  allItems:Item[]=[]
  ngOnInit() {

    this.allItems = JSON.parse(localStorage.getItem ("itemsInCart"));
    console.log(this.allItems);

    
  }

}
