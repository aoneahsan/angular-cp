import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    
    ingredientsChangeListner = new Subject<Ingredient[]>();

    editedIngredient = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apple",5),
        new Ingredient("Orange",4),
        new Ingredient("Banana",15)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredientS(ingredient: Ingredient) {
        console.log(this.ingredients);
        this.ingredients.push(ingredient);
        console.log("addIngredientAction called",this.ingredients);
        this.ingredientsChangeListner.next(this.ingredients.slice());
    }

    editIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChangeListner.next(this.ingredients.slice());
    }

    deleteIngredientS(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChangeListner.next(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]) {
        // console.log(ingredients);
        ingredients.forEach(ingredient => {
            this.ingredients.push(ingredient);
        });
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }
}