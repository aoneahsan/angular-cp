import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService) {}

    intercept(reqs: HttpRequest<any>, next: HttpHandler) {
        return this._authService.User.pipe(
            take(1),
            exhaustMap(
                user => {
                    if (!user) {
                        return next.handle(reqs);
                    }
                    const modifiedReqs = reqs.clone({params: new HttpParams().set('auth', user.token)});
                    return next.handle(modifiedReqs);
                }
            )
        )
    }
}