import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeResolveService } from './recipe-resolve.service';

import { RecipesComponent } from './recipes.component';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
    {
        path: "",
        component: RecipesComponent,
        canActivate: [AuthGuardService],
        children: [
            {
            path: '',        
            component: NoRecipeSelectedComponent
            },
            {
            path: 'new',
            component: RecipeEditComponent
            },
            {
            path: ':id',
            component: RecipeDetailComponent,
            resolve: [RecipeResolveService]
            },
            {
            path: ':id/edit',
            component: RecipeEditComponent,
            resolve: [RecipeResolveService]
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipeRoutingModule {

}