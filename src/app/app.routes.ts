import { Routes } from '@angular/router';
import {LayoutComponent} from './public/components/layout/layout.component';
import {CustomerMealPlanComponent} from './meal-plan/pages/customer-meal-plan/customer-meal-plan.component';
import {MealPlanDetailComponent} from './meal-plan/components/meal-plan-detail/meal-plan-detail.component';

export const routes: Routes = [
  {
    path: '',
    component:LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./meal-plan/meal-plan.module').then((m) => m.MealPlanModule)
      },
/*      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule)
      },*/
/*      {
        path: '',
        redirectTo: 'meal-plan',
        pathMatch: 'full'
      }*/
    ]
  },
  {
    //ruta no encontrada redirige a meal-plan
    path: '**',
    redirectTo: ''
  }
];
