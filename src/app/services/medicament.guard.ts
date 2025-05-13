import { CanActivateFn } from '@angular/router';

export const medicamentGuard: CanActivateFn = (route, state) => {
  return true;
};
