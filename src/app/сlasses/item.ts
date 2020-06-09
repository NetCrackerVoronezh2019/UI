import { ItemSize } from './itemSize';

export class Item
{
    public id:Number;
    public color:String;
    public picturePath:String;
    public price:number;
    public name:String;
    public description:String;
    public itemCount:Number;
    public sizes:ItemSize[];
}