import { AbstractControl} from '@angular/forms';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class DialogsService
{
    constructor(private http: HttpClient) {}
    userId:string = '1'; //test id
    userName:String;

    getUserName():String {
      this.http.get<string>('http://localhost:8080/UserName',{params:new HttpParams().set('userId',this.userId)}).subscribe(
                data => {
                  this.userName = data;
                  console.log('DATA' + data);
                },
                error => console.log('ERROR' + error)
            );
            return this.userName;
      }
}
