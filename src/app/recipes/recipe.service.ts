import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    
    recipeSelected = new EventEmitter<Recipe>();
    recipesChange = new Subject<Recipe[]>();    

    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe('A test Recipe 0', 
    //     'A test Recipe description 0', 
    //     'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending_01_0.jpg?itok=uiX2Gkhe',
    //     [
    //         new Ingredient("Meat", 2),
    //         new Ingredient("Drink", 1)
    //     ]),
    //     new Recipe('A test Recipe 1', 
    //     'A test Recipe description 1', 
    //     'https://media3.s-nbcnews.com/j/MSNBC/Components/Video/201808/tdy_food_klg_chicken_180828_1920x1080.today-inline-vid-featured-desktop.jpg',
    //     [
    //         new Ingredient("Item", 2),
    //         new Ingredient("Item 2", 2)
    //     ]),
    // ];

    constructor() {}

    setRecipes(recipes) {
        this.recipes = recipes;
        this.recipesChange.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeByID(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChange.next(this.recipes.slice());
    }

}