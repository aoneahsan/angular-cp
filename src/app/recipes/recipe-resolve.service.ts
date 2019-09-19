import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: "root"
})
export class RecipeResolveService implements Resolve<Recipe[]>{

    constructor(private _dataStorageService: DataStorageService, private _recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this._recipeService.getRecipes();
        if (recipes.length === 0) {
            return this._dataStorageService.fetchRecipes();            
        } else {
            return recipes;
        }
    }

}