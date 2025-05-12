import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeDetailComponent} from './pages/recipe-detail/recipe-detail.component';
import {RecipeCreateComponent} from './pages/recipe-create/recipe-create.component';
import {FavoriteRecipeComponent} from './pages/favorite-recipe/favorite-recipe.component';
import {RecipeListComponent} from './pages/recipe-list/recipe-list.component';

const routes: Routes = [
  { path: 'create-recipe', component: RecipeCreateComponent },
  { path: 'favorite-recipe', component: FavoriteRecipeComponent },
  { path: 'recipedetail/:id', component: RecipeDetailComponent },
  {path: 'recipe-list', component: RecipeListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
