import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthanticate: boolean = false;
  userSub: Subscription;

  constructor(private _dataStorageService: DataStorageService, private _authService: AuthService) { }

  ngOnInit() {
    this.userSub = this._authService.User.subscribe(
      user => {
        this.isAuthanticate = !!user;
        console.log("!user = "+!user, "!!user = "+!!user);
      }
      );
  }

  saveRecipes() {
    this._dataStorageService.saveRecipes().subscribe();
    console.log("Recipes Saved!");
  }

  fetchRecipes() {
    this._dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  Logout() {
    this._authService.logout();
  }

}
