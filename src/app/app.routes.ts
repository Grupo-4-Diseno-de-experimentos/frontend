import { Routes } from '@angular/router';
import { LayoutComponent } from './public/components/layout/layout.component';
import { CustomerMealPlanComponent } from './meal-plan/pages/customer-meal-plan/customer-meal-plan.component';
import { MealPlanDetailComponent } from './meal-plan/components/meal-plan-detail/meal-plan-detail.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component'; // Importa el componente de Login
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component'; // Importa el componente de Register

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent }, // Ruta para la página de Login
  { path: 'register', component: RegisterPageComponent }, // Ruta para la página de Register
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./meal-plan/meal-plan.module').then((m) => m.MealPlanModule)
      },
      /* {
                path: 'profile',
                loadChildren: () =>
                  import('./profile/profile.module').then((m) => m.ProfileModule)
              },*/
      /* {
                path: '',
                redirectTo: 'meal-plan',
                pathMatch: 'full'
              }*/
    ]
  },
  {
    // ruta no encontrada redirige a la raíz (que a su vez podría redirigir a login)
    path: '**',
    redirectTo: ''
  }
];
