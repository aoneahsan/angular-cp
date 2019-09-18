import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  recipes: Recipe[];

  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this._recipeService.getRecipes();
    this.subscription = this._recipeService.recipesChange.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
