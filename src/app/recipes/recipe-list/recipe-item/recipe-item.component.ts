import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('RecipeItem') recipe: Recipe;

  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
  }

  recipeSelect() {
    // console.log("ok",this.recipe);
    this._recipeService.recipeSelected.emit(this.recipe);
  }

}
