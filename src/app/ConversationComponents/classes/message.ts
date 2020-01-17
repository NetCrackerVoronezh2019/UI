import { User } from '@ConversationClasses/User'

export class Message
{
  text:string;
  sender:User;
  dialog:number;
  date:Date;
  isModified:boolean;
  messageId:number;
}
