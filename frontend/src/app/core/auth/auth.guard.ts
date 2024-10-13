import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomAuthService } from './customAuth.service';

export const authGuard: CanActivateFn = () => {
  const customAuthService = inject(CustomAuthService);
  const router = inject(Router);
  const isLoggedIn = customAuthService.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/account']);
    return false;
  }
  return true;
};
