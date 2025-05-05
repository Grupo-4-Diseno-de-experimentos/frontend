import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMealPlanComponent } from './pages/customer-meal-plan/customer-meal-plan.component';
import { MealPlanDetailComponent } from './components/meal-plan-detail/meal-plan-detail.component';

const routes: Routes = [
  { path : '', component: CustomerMealPlanComponent},
  { path: 'meal_plan/plandetail/:id', component: MealPlanDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPlanRoutingModule {}
