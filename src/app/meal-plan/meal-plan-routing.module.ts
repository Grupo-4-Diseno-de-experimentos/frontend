import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealPlanDetailComponent } from './components/meal-plan-detail/meal-plan-detail.component';
import {MealPlanListComponent} from './pages/meal-plan-list/meal-plan-list.component';
import {CreatePlanComponent} from './pages/create-plan/create-plan.component';

const routes: Routes = [
  { path : '', component: MealPlanListComponent},
  { path: 'plandetail/:id', component: MealPlanDetailComponent },
  { path: 'create-plan', component: CreatePlanComponent },
/*  { path: 'current-plan', component: MealPlanDetailComponent }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPlanRoutingModule {}
