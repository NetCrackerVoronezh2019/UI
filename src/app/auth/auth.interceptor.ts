import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer_' + localStorage.getItem('token'))
                .set('Content-Type', 'application/json; charset=utf-8')
                 
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => {  },
                    err => {
                        if (err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/signin');
                        }
                        if(err.status == 403)
                        {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/signin');
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
}