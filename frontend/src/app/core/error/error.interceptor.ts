import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CustomAuthService } from '../auth/customAuth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const customAuthService = inject(CustomAuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        customAuthService.logout();
        router.navigate(['/account']);
      }

      if (error.status === 500) {
        router.navigate(['/error']);
      }

      return throwError(() => error);
    })
  );
};
