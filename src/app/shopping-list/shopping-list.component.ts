import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    // console.log("shopping list OnInt Method called");
    this.ingredients = this._shoppingListService.getIngredients();
    this.subscription = this._shoppingListService.ingredientsChangeListner.subscribe(
      (newIngredients: Ingredient[]) => {
        this.ingredients = newIngredients;
      }
    )
  }

  editIngredient(index: number) {
    this._shoppingListService.editedIngredient.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
