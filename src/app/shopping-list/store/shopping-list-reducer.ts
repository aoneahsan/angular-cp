import { Ingredient } from "src/app/shared/ingredient.model";

import * as ShoppingListActions from './shopping-list-actions';

const initialState = {
    ingredients: [
        new Ingredient('Apple', 6),
        new Ingredient('Banana', 16)
    ]
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            }
        default:
            return state;
    }
}