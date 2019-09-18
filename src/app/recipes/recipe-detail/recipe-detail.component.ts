import { Component, OnInit,Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeData: Recipe;

  recipeId: number;

  constructor(private _shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private _recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.recipeData = this._recipeService.getRecipeByID(data['id']);
        this.recipeId = data['id'];
      }
    )
  }

  addIngredients() {
    this._shoppingListService.addIngredientsFromRecipe(this.recipeData.ingredients)
  }

  deleteRecipe() {
    this._recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }

}
