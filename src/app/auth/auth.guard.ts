import { Injectable,OnInit} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  x:any;
  constructor(private authService:AuthService,private router:Router){}

    canActivate(){
      return this.authService.getRole().pipe(
        map((res:any) => 
          {
            if (res.roleName=="ROLE_ADMIN") {
              console.log(res);
              return true;
            }
            else{ 
              this.router.navigate(['/']);
              return false;
            }
            
        }),
        catchError(err=> {return of(false);})
      ); 
  }
}
