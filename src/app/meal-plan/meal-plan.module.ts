import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MealPlanRoutingModule} from './meal-plan-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MealPlanRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class MealPlanModule { }
