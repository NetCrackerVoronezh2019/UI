
import {Advertisement} from '../classes/advertisement'
export class Order
{
    public orderId:Number;
    public customerId:Number;
    public freelancerId:Number;
    public advertisementId:Number;
    public status:String;
    public nextStatus:String;
    public starsForWork:Number;
    public freelancerFIO:String;
    public customerFIO:String;
    public comment:String;
    public advertisement:Advertisement;
    public customerImageKey:String;
    public constructor(){}
}