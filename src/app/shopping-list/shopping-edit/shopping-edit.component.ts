import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f',{static:false}) slForm: NgForm;

  subscription: Subscription;
  editingMode: boolean = false;
  editingItemIndex: number;
  ingredient: Ingredient;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this._shoppingListService.editedIngredient.subscribe(
      (number) => {
        this.editingItemIndex = number;
        this.editingMode = true;
        this.ingredient = this._shoppingListService.getIngredient(number);
        this.slForm.setValue({          
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      }
    )
  }

  slFormSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name,value.amount);
    if (!this.editingMode) {
      this._shoppingListService.addIngredientS(ingredient);      
    } else {
      this._shoppingListService.editIngredient(this.editingItemIndex, ingredient);
    }
    form.reset();
    this.editingMode = false;
  }

  deleteIngredient(index) {
    this._shoppingListService.deleteIngredientS(index);
    this.slForm.reset();
    this.editingMode = false;
  }

  clearForm() {
    this.slForm.reset();
    this.editingMode = false;
  }

}
