import {User} from '@UserAndGroupClasses/user'
export class Comment
{
  text:string;
  sender:User;
  date:string;
  postId:number;
  commentId:number;
}
