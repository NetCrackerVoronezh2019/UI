import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { User } from '@UserAndGroupClasses/user'

@Injectable()
export class CommentService {

  constructor(private http: HttpClient, private fb:FormBuilder) { }


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
    return this.http.put('http://localhost:9080/comments/redact',body)
  }

  deleteComment(commentId) {
    return this.http.delete('http://localhost:9080/comments/delete',{params: new HttpParams().set('commentId',commentId)})
  }

}
