import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponse } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth-component.html'
})
export class AuthComponent implements OnInit{
    
    isLoginMode: boolean = true;
    isLoading: boolean;
    error: string = "";

    authObservable: Observable<AuthResponse>;

    constructor(private _authService: AuthService, private router: Router) {}

    ngOnInit() {}

    formAction(form: NgForm) {
        // console.log(form.value);
        this.error = "";
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;
        if (this.isLoginMode) {
            this.authObservable = this._authService.signIn(email, password);
        } else {
            this.authObservable = this._authService.signUp(email, password);
        }

        this.authObservable.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        )

        form.reset();
    }

    switchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

}