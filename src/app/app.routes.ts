import { Routes } from '@angular/router';
import { LayoutComponent } from './public/components/layout/layout.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { StartObjectivesComponent } from './user-profile/pages/start-objectives/start-objectives.component';
import { SetObjectives1Component } from './user-profile/pages/set-objectives-1/set-objectives-1.component';
import {SetObjectives2Component} from './user-profile/pages/set-objectives-2/set-objectives-2.component';
import {SetObjectives3Component} from './user-profile/pages/set-objectives-3/set-objectives-3.component';
import {SetObjectives4Component} from './user-profile/pages/set-objectives-4/set-objectives-4.component';
import {SetObjectives5Component} from './user-profile/pages/set-objectives-5/set-objectives-5.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'start-objectives', component: StartObjectivesComponent },
  { path: 'set-objectives-1', component: SetObjectives1Component },
  { path: 'set-objectives-2', component: SetObjectives2Component },
  { path: 'set-objectives-3', component: SetObjectives3Component },
  { path: 'set-objectives-4', component: SetObjectives4Component },
  { path: 'set-objectives-5', component: SetObjectives5Component },
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
