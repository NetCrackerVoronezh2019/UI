import { AbstractControl} from '@angular/forms';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class DialogsService
{
    constructor(private http: HttpClient) {}

    getUser(userId:string) {
      return this.http.get('http://localhost:8080/getUser',
                          {params:new HttpParams().set('userId',userId)});
      }
      getUserDialogs(userId:string) {
        return this.http.get('http://localhost:8080//getUserDialogs',
                            {params:new HttpParams().set('userId',userId)});
      }
}
