import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    return true;
  }

  router.navigate(['login']);

  return false;
};

export const redirectToMainPage: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    router.navigate(['users']);
    return false;
  }

  return true;
};
