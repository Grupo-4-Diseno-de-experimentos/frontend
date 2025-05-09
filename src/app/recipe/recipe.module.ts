import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeDetailComponent} from './pages/recipe-detail/recipe-detail.component';
import {RecipeRoutingModule} from './recipe-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecipeDetailComponent,
    RecipeRoutingModule,
  ]
})
export class RecipeModule { }
