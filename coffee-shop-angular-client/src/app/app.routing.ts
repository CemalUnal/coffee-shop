import { Routes, RouterModule } from '@angular/router';

import { HomeScreen } from './home/home';
import { LoginScreen } from './login/login';
import { RegisterScreen } from './register/register';
import { OrderScreen } from './home/orders/orders';
import { ProductScreen } from './home/products/products';
import { UserScreen } from './home/users/users';
import { OrderDetails } from './home/users/order-details/order-details';

const appRoutes: Routes = [
  {
    path: 'home', component: HomeScreen, children: [
      { path: 'orders', component: OrderScreen },
      { path: 'products', component: ProductScreen },
      { path: 'users', component: UserScreen },
      { path: 'users/detail/:id', component: OrderDetails }
    ]
  },
  { path: 'login', component: LoginScreen },
  { path: 'register', component: RegisterScreen },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

export const AppRouter = RouterModule.forRoot(appRoutes);
