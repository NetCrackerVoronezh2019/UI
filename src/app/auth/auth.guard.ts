import { Injectable } from '@angular/core';
import {OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  x:any;
  constructor(private authService:AuthService){}

    canActivate(){
      return this.authService.getRole().pipe(
        map((res:any) => 
          {
            if (res.token=='ROLE_ADMIN') {
              console.log(res);
              return true;
            }
            else{ return false;}
            
        }),
        catchError(err=> {return of(false);})
      ); 
  }
}
