import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  invalidCredentialMsg!: string;
  loginForm!: FormGroup;
  submitted!: boolean;

  onSubmit() {
    this.submitted = true;
    const user = {
      user: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.loginService.login(user).subscribe({
      next: (val: any) => {
        localStorage.setItem('userName', user.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => (this.invalidCredentialMsg = err.error.error),
    });
  }
}
