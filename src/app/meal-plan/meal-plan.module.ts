import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MealPlanRoutingModule} from './meal-plan-routing.module';
import {CustomerMealPlanComponent} from './pages/customer-meal-plan/customer-meal-plan.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MealPlanRoutingModule,
    MatCardModule,
    MatButtonModule,
    CustomerMealPlanComponent
  ]
})
export class MealPlanModule { }
