import { Routes } from '@angular/router';
import { LayoutComponent } from './public/components/layout/layout.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { StartObjectivesComponent } from './user-profile/pages/start-objectives/start-objectives.component';
import { SetObjectives1Component } from './user-profile/pages/set-objectives-1/set-objectives-1.component'; // Importa el componente SetObjectives1

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'start-objectives', component: StartObjectivesComponent },
  { path: 'set-objectives-1', component: SetObjectives1Component },
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
    path: '**',
    redirectTo: ''
  }
];
