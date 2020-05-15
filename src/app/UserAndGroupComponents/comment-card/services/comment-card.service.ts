import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { User } from '@UserAndGroupClasses/user'
import {Observable} from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient, private fb:FormBuilder, private http2: Http) { }


  commentSettingsForm=this.fb.group(
    {
      "text":["",[Validators.minLength(10)]]
    }
  )

  getCommentSettingsForm(){
    return this.commentSettingsForm
  }

  sendCommentSettings(commentId) {
    const body = {
      commentId:commentId,
      text:this.commentSettingsForm.value.text
    }
    return this.http.put('http://95.30.222.140:9080/comments/redact',body)
  }

  deleteComment(commentId) {
    return this.http.delete('http://95.30.222.140:9080/comments/delete',{params: new HttpParams().set('commentId',commentId)})
  }

  downloadProfileImage(key:String): Observable<any>{
      return this.http2.get('http://95.30.222.140:1234/getuserimg/'+key, {responseType: ResponseContentType.Blob});
  }

}
