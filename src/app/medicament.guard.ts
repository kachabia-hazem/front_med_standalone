import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const medicamentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAdmin())
    return true;
  else {
    router.navigate(['/forbidden']); // Correction ici : '/forbidden' au lieu de 'app-forbidden'
    return false;
  }
};