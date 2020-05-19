import { User } from '@ConversationClasses/User'

export class Message
{
  text:string;
  sender:User;
  dialog:number;
  date:string;
  isModified:boolean;
  isNoRead:boolean;
  messageId:number;
  files:string[];
  names:string[];
  readBySomebody:boolean;
}
