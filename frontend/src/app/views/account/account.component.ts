import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomAuthService } from '../../core/auth/customAuth.service';
import { SwitchTabComponent } from './components/switch-tab/switch-tab.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SwitchTabComponent,
    InputFieldComponent,
  ],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  isLoginMode = true;

  fb = inject(FormBuilder);
  customAuthService = inject(CustomAuthService);

  getControl(name: string) {
    return this.accountForm.get(name) as FormControl;
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSwitchMode(mode: boolean): void {
    this.isLoginMode = mode;
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

  getAriaInvalid(field: string): boolean {
    return this.isInvalid(field);
  }
}
