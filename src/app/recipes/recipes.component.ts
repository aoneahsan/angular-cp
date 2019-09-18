import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  // selectedRecipe variable
  selectedRecipe: Recipe;


  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
    this._recipeService.recipeSelected.subscribe(
      (recipeData: Recipe) => {
        this.selectedRecipe = recipeData;
      }
    )
  }

  sendRecipeToDetail(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

}
