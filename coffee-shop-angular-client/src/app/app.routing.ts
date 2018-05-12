import { Routes, RouterModule } from '@angular/router';

import { HomeScreen } from './home/home';
import { LoginScreen } from './login/login';
import {RegisterScreen} from './register/register';

const appRoutes: Routes = [
  { path: '', component: HomeScreen },
  { path: 'login', component: LoginScreen },
  { path: 'register', component: RegisterScreen},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const Router = RouterModule.forRoot(appRoutes);
