import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeDetailComponent} from './pages/recipe-detail/recipe-detail.component';
import {RecipeRoutingModule} from './recipe-routing.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecipeDetailComponent,
    RecipeRoutingModule,
    MatSelectModule
  ]
})
export class RecipeModule { }
