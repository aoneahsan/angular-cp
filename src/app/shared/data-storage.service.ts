import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, tap, take, exhaustMap } from "rxjs/operators";
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  url = "https://angular-course-767e6.firebaseio.com/recipes.json";

  constructor(
    private _recipeService: RecipeService, 
    private _http: HttpClient, 
    private _authService: AuthService) { }

  saveRecipes() {
    console.log("Saving Posts!");
    const recipes = this._recipeService.getRecipes();
    return this._http.put(this.url, recipes);
  }

  fetchRecipes() {
    return this._http.get<Recipe[]>(this.url).pipe(
      map(
      recipes => {
        return recipes.map(
          recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          }
        )
      }),
      tap(
        recipes => {
          console.log("Fetching Posts!");
          this._recipeService.setRecipes(recipes);
        })      
    );
  }
  
}
