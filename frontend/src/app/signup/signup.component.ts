import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  invalidPasswordMsg!: string;
  signupForm!: FormGroup;
  submitted!: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    const user = {
      user: this.signupForm.controls['userName'].value,
      password: this.signupForm.controls['password'].value,
      confirmPassword: this.signupForm.controls['confirmPassword'].value,
    };
    if (user.password === user.confirmPassword) {
      this.signupService.signUp(user).subscribe({
        next: (val: any) => {
          localStorage.setItem('userName', user.user);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => (this.invalidPasswordMsg = err.error.err),
      });
    } else {
      this.invalidPasswordMsg = "Passwords doesn't match";
    }
  }
}
