import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { User } from '@UserAndGroupClasses/user'
import {Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';
import {AppProperties} from 'src/app/appProperties'

@Injectable()
export class PostService {

  constructor(private http: HttpClient, private fb:FormBuilder, private http2: Http) { }

  commentCreatForm=this.fb.group(
    {
      "text":["",[Validators.minLength(10)]]
    }
  )

  postSettingsForm=this.fb.group(
    {
      "text":["",[Validators.minLength(10)]]
    }
  )

  getPostSettingsForm(){
    return this.postSettingsForm
  }

  getCommentCreateForm() {
    return this.commentCreatForm
  }

  getPostComments(postId) {
    return this.http.get(AppProperties.ip+':9080/posts/getComments',{params: new HttpParams().set('postId',postId)})
  }

  sendComment(user:User,postId) {
    const body = {
      postId:postId,
      sender:user,
      text:this.commentCreatForm.value.text
    }
    return this.http.post(AppProperties.ip+':9080/comments/send',body)
  }

  sendPostSettings(postId) {
    const body = {
      postId:postId,
      text: this.postSettingsForm.value.text
    }
    return this.http.put(AppProperties.ip+':9080/posts/redact',body)
  }

  deletePost(postId) {
    return this.http.delete(AppProperties.ip+':9080/posts/delete',{params: new HttpParams().set('postId',postId)})
  }

  downloadGroupImage(key:String): Observable<any>{
      return this.http2.get(AppProperties.ip+':1234/getGroupImg/'+key, {responseType: ResponseContentType.Blob});
  }

}
