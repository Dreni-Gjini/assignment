import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../api';
import { JwtService } from './jwt.service';
import { AuthApiResponse, JwtPayload } from './models/auth.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  authService = inject(AuthService);
  jwtService = inject(JwtService);
  router = inject(Router);

  usernameSignal = signal<string | null>(null);

  login(username: string, password: string): void {
    this.authService
      .login({ username, password })
      .pipe(
        tap((response) => {
          this.jwtService.saveToken(response.accessToken);

          this.usernameSignal.set(response.user.username);
        }),
        take(1)
      )
      .subscribe({
        next: () => this.router.navigate(['/chat']),
        error: (err) => console.error('Login error:', err),
      });
  }

  register(username: string, password: string) {
    return this.authService
      .register({ username, password })
      .pipe(
        tap((response) => {
          this.jwtService.saveToken(response.accessToken);

          this.usernameSignal.set(response.user.username);
        }),
        take(1)
      )
      .subscribe({
        next: () => this.router.navigate(['/chat']),
        error: (err) => console.error('Registration error:', err),
      });
  }

  isLoggedIn(): boolean {
    const token = this.jwtService.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: JwtPayload = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        console.warn('Token has expired');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
  }

  logout(): void {
    this.router.navigate(['/account']);
    this.usernameSignal.set(null);
    return this.jwtService.clearToken();
  }
}
