import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolveService } from './recipes/recipe-resolve.service';
import { AuthComponent } from './auth/auth-compoenent';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "recipes",
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
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent
  },
  {
    path: "auth",
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
