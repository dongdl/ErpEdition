import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
loading = false

  credentialForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get username() {
    return this.credentialForm.get('username');
  }

  get password() {
    return this.credentialForm.get('password');
  }

  onSubmitForm() {
    const { username, password } = this.credentialForm.value;
    if (username && password) {
      this.loading = true
      this.authService.loginUser({ username, password }).subscribe({
        next: (value) => {
           this.loading = false
          this.router.navigate(['users']);
        },
        error: (error) => {
           this.loading = false
          if (error instanceof Error) {
            this.username?.setErrors({
              incorrect: true,
            });
          }
        },
      });
    }
  }
}
