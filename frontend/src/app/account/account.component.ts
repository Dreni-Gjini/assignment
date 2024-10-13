import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomAuthService } from '../auth/customAuth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  isLoginMode = true;
  loginError = '';

  fb = inject(FormBuilder);
  customAuthService = inject(CustomAuthService);

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    console.log('submiting', this.accountForm);
    if (this.accountForm.invalid) {
      return;
    }

    const { username, password } = this.accountForm.value;

    if (this.isLoginMode) {
      this.login(username, password);
    } else {
      this.register(username, password);
    }
  }

  login(username: string, password: string): void {
    this.customAuthService.login(username, password);
  }

  register(username: string, password: string): void {
    this.customAuthService.register(username, password);
  }

  isInvalid(field: string): boolean {
    return (
      (this.accountForm!.get(field)?.invalid ?? false) &&
      (this.accountForm!.get(field)?.touched ?? false)
    );
  }

  getAriaInvalid(field: string): string {
    return this.isInvalid(field) ? 'true' : 'false';
  }
}
