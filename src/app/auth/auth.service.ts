import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user-model';

// interface to recive data
export interface AuthResponse {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: "root"
})
export class AuthService {

    User = new BehaviorSubject<User>(null); // BehaviorSubject is similar to Subject in advance it gives a privious state also (null) in this case,

    tokenExpirationTime: any;
    constructor(private _http: HttpClient, private router: Router) {}    

    signUp(email: string, password: string) {
        return this._http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTqPwqXH7nSV29Jr3E-UlIRZUp5_SjzQI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.errorHandle),
        tap(
            resData => {
                this.authanticate(resData);
            }
        )
        );
    }
    // sign up functions ends

    // sign in functions starts
    signIn(email: string, password: string) {
        return this._http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTqPwqXH7nSV29Jr3E-UlIRZUp5_SjzQI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandle),
        tap(
            resData => {
                this.authanticate(resData);
            }
        )
        );
    }

    logout() {
        this.User.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpirationTime) {
            clearTimeout(this.tokenExpirationTime);
        }
        this.tokenExpirationTime = null;
    }

    // AutoLogin function
    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadUser = new User(
            userData.email, 
            userData.id, 
            userData._tokken, 
            new Date(userData._tokkenExpireDate));

        if (loadUser.token) {
            this.User.next(loadUser);
            const expireDuration = new Date(userData._tokkenExpireDate).getTime() - new Date().getTime();
            this.autoLogout(expireDuration);
        }
    }

    // autoLogout function
    autoLogout(expireTime: number) {
        this.tokenExpirationTime = setTimeout(() => {
            this.logout();
        }, expireTime);
        console.log(expireTime);
    }

    // errorHandle function to handle errors from login and signup trys.
    private errorHandle(errorRes: HttpErrorResponse) {
        let errorMessage = "an error occured";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "Email Exists";
                break;
            case "OPERATION_NOT_ALLOWED":
                errorMessage = "OPERATION NOT ALLOWED";
                break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                errorMessage = "TOO MANY ATTEMPTS TRY LATER";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "EMAIL_NOT_FOUND";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "INVALID_PASSWORD";
                break;
            case "USER_DISABLED":
                errorMessage = "USER_DISABLED";
                break;
        }
        return throwError(errorMessage);
    }

    // function to handle authenticate requests
    private authanticate(resData) {
        const expireDate = new Date(new Date().getTime() + +resData.expiresIn *1000);
        const newUser = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expireDate
        );
        this.User.next(newUser);
        this.autoLogout(resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(newUser));
    }
}