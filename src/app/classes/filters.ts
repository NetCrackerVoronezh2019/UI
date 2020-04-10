import {Subject} from './subject'
import {Tag} from './tag'

export class Filters
{
    public subjects:Subject[];
    public minPrice:Number;
    public maxPrice:Number;
    public searchRow:String;
    public type:String;
    public tags:Tag[]

    constructor(){}
}