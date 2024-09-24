import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './core/services/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthServiceService);
  const router=inject(Router);

  if (authService.isAuth()) {
    return true;

  }
  router.navigate([authService.redirectUrl]);
  return false;
};
