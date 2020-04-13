import { Component, Input,OnInit } from '@angular/core';
import { Comment } from '@UserAndGroupClasses/comment'
import { User } from '@UserAndGroupClasses/user'
import {CommentService} from './services/comment-card.service'

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  providers:[CommentService]
})
export class CommentCardComponent implements OnInit {

  @Input() comment:Comment;
  @Input() admin:boolean;
  @Input() user:User;
  commentSettingsVisible = false;
  deleted = false;
  constructor(private cs:CommentService) { }

  ngOnInit() {
  }

 showCommentSettings() {
   this.cs.getCommentSettingsForm().reset({text:this.comment.text})
   this.commentSettingsVisible = true;
 }

 closeCommentSettings() {
   this.commentSettingsVisible = false;
 }

 sendCommentSettings() {
   this.cs.sendCommentSettings(this.comment.commentId).subscribe(data => {
     this.comment.text = this.cs.getCommentSettingsForm().value.text;
     this.commentSettingsVisible = false;
   })
 }

 deleteComment() {
  if (confirm("Вы уверены, что хотите удалить этот коментарий?")) {
    this.cs.deleteComment(this.comment.commentId).subscribe(data => {
      this.deleted = true;
    })
  }
 }

}
