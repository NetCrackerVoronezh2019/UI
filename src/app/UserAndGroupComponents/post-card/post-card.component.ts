import { Component, Input,OnInit } from '@angular/core';
import { Post } from '@UserAndGroupClasses/post'
import { Group } from '@UserAndGroupClasses/group'
import { Comment } from '@UserAndGroupClasses/comment'
import { User } from '@UserAndGroupClasses/user'
import {PostService} from './services/post-card.service'

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  providers:[PostService]
})
export class PostCardComponent implements OnInit {

  @Input() post:Post;
  @Input() group:Group;
  @Input() admin:boolean;
  @Input() user:User;
  comments:Comment[];
  showComments = false;
  createCommentVisible = false;
  postSettingsVisible = false;
  deleted = false;
  constructor(private ps:PostService) { }

  ngOnInit() {
  }


  getComments() {
    this.ps.getPostComments(this.post.postId).subscribe((data:Comment[]) =>{
      this.comments = data;
      console.log(data);
    })
  }

  showCommentsPart() {
    this.getComments();
    this.showComments = true;
  }

  closeCommentsPart() {
    this.showComments = false;
  }

  showCreateComment() {
    this.ps.getCommentCreateForm().reset();
    this.createCommentVisible = true;
  }

  closeCreateComment() {
    this.createCommentVisible = false;
  }

  sendComment() {
    this.ps.sendComment(this.user,this.post.postId).subscribe(data => {
      this.getComments();
      this.createCommentVisible = false;
    })
  }

  showPostSettings() {
    this.ps.getPostSettingsForm().reset({text:this.post.text})
    this.postSettingsVisible = true;
  }

  closePostSettings() {
    this.postSettingsVisible = false;
  }

  sendPostSettings() {
    this.ps.sendPostSettings(this.post.postId).subscribe(data => {
      this.post.text = this.ps.getPostSettingsForm().value.text;
      this.postSettingsVisible = false;
    })
  }

  deletePost() {
    if (confirm("Вы уверены, что хотите удалить этот пост?")) {
      this.ps.deletePost(this.post.postId).subscribe(data => {
        this.deleted = true;
      })
    }
  }

}
