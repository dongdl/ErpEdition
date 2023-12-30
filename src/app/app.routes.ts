import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import {
  AuthGuard,
  redirectToMainPage,
} from './shared/services/authentication/authGuard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./modules/main-routing.module`).then(
        (module) => module.MainRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectToMainPage],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
