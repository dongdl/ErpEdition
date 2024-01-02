import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HrRecordsService } from '../../../modules/hr-records/hr-records.service';

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

export const hasNoUser: CanActivateFn = () => {
  const recordService = inject(HrRecordsService);
  const router = inject(Router);

  if (recordService.previewRecord.value === null) {
    router.navigate(['ho-so-nhan-su']);
    return false;
  }

  return true;
};
