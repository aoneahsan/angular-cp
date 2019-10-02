import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth-compoenent';
import { AnimationComponent } from './animation/animation.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "animations",
    component: AnimationComponent
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "recipes",
    loadChildren: './recipes/recipe-module#RecipeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
