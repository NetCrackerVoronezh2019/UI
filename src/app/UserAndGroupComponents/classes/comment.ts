import {User} from '@UserAndGroupClasses/user'
export class Comment
{
  text:string;
  sender:User;
  date:Date;
  postId:number;
  commentId:number;
}
