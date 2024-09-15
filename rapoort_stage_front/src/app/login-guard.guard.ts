import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from './core/services/auth-service.service';
import { CanActivateFn, Router } from '@angular/router';


export const LoginGuardGuard : CanActivateFn= (route,state)=> {
  const authservice = inject (AuthServiceService);
  const router = inject (Router);


  if(authservice.isAuth()){
    router.navigate(['/dashboard']);
    return false;
  }
  router.navigate([authservice.redirectUrl]);
  return true;

}
