import { Component, Input,OnInit } from '@angular/core';
import { Post } from '@UserAndGroupClasses/post'
import { Group } from '@UserAndGroupClasses/group'
import { Comment } from '@UserAndGroupClasses/comment'
import { User } from '@UserAndGroupClasses/user'
import {PostService} from './services/postCard.service'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  providers:[PostService]
})
export class PostCardComponent implements OnInit {

  @Input() post:Post;
  @Input() groupName:any;
  @Input() groupImage:any;
  @Input() admin:boolean;
  @Input() user:User;
  date:string = '';
  comments:Comment[];
  showedComments:Comment[];
  showComments = false;
  createCommentVisible = false;
  postSettingsVisible = false;
  deleted = false;
  showAllComents = false;
  postImages:any[] = [] ;
  constructor(private ps:PostService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.date = this.post.date.split('T')[0]+ ' ' + this.post.date.split('T')[1].split('.')[0]
    this.downloadPostImages(this.post.images);
  }


  getComments() {
    this.ps.getPostComments(this.post.postId).subscribe((data:Comment[]) =>{
      this.comments = data;
      this.showedComments = data.slice(0,2);
      console.log(data);
    })
  }

  showCommentsPart() {
    this.getComments();
    this.showComments = true;
    this.showAllComents = false;
  }

  closeCommentsPart() {
    this.showComments = false;
    this.showAllComents = false;
  }

  openAllcoments() {
    this.showAllComents = true;
    this.showedComments = this.comments;
  }

  closeAllComments() {
      this.showAllComents = false;
      this.showedComments = this.comments.slice(0,2);
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

  downloadPostImages(keys:String[])
  {
    for (let key of keys) {
    this.ps.downloadGroupImage(key)
      .subscribe(
        (response) => {
          let blob:any= new Blob([response.blob()], { type:'image/jpg; charset=utf-8'});
          let postImage:any = URL.createObjectURL(blob)
          postImage = this.sanitizer.bypassSecurityTrustUrl(postImage);
          this.postImages.push(postImage);
        },
         error => console.log('Error')
      )
    }
  }

}
