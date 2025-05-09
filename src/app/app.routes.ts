import { Routes } from '@angular/router';
import {LayoutComponent} from './public/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component:LayoutComponent,
    children: [
      {
        path: 'meal_plan',
        loadChildren: () =>
          import('./meal-plan/meal-plan.module').then((m) => m.MealPlanModule)
      },
      {
        path: 'recipe',
        loadChildren: () =>
          import('./recipe/recipe.module').then((m) => m.RecipeModule)
      },/*
      {
        path: '',
        redirectTo: 'meal-plan',
        pathMatch: 'full'
      }*/
    ]
  },
/*  {
    //ruta no encontrada redirige a meal-plan
    path: '**',
    redirectTo: ''
  }*/
];
