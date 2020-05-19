import { Component, Input,OnInit } from '@angular/core';
import { Comment } from '@UserAndGroupClasses/comment'
import { User } from '@UserAndGroupClasses/user'
import {CommentService} from './services/comment-card.service'
import { DomSanitizer } from "@angular/platform-browser";

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
  userImage:any = null;
  loading = false;
  date:string = '';
  constructor(private cs:CommentService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.date = this.comment.date.split('T')[0]+ ' ' + this.comment.date.split('T')[1].split('.')[0]
    if (this.user.image != null) {
      this.downloadProfileImage(this.user.image);
    }
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

 downloadProfileImage(key:String)
 {

   this.cs.downloadProfileImage(key)
     .subscribe(
       (response) => {
         let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
         this.userImage=URL.createObjectURL(blob)
         this.userImage=this.sanitizer.bypassSecurityTrustUrl(this.userImage);
         this.loading = true;
       },
        error => console.log('Error')
     )

 }

}
