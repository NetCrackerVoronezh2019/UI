import {Tag} from "./tag";

export class Advertisement
{
    advertisementId:Number;
    section:String;
    advertisementName:String;
    imageKeys:String[];
    description:String;
    budget:String;
    authorId:Number;
    firstName:String;
    surName:String;
    name:String;
	dateOfPublication:String;
    deadline:String;
    type:String;
    tags:Tag[];
    constructor() {}
}