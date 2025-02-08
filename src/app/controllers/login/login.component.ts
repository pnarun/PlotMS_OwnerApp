import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Subscribe to form value changes to enable/disable the button
    this.loginForm.valueChanges.subscribe(() => {
      this.updateButtonState();
    });
  }

  updateButtonState() {
    // This method can be used to perform any additional logic if needed
  }

  login() {
    this.errorMessage = ''; // Reset error message

    // Check if the form is valid
    console.log('Login method called');
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form value:', this.loginForm.value);

    if (this.loginForm.invalid) {
      if (this.loginForm.get('username')?.hasError('required')) {
        this.errorMessage = 'Username is required.';
      } 
      if (this.loginForm.get('password')?.hasError('required')) {
        this.errorMessage = 'Password is required.';
      }
      return; // Exit if the form is invalid
    }

    const { username, password } = this.loginForm.value;

    // Check credentials
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true'); // Set login status
      const redirectUrl = localStorage.getItem('redirectUrl') || '/home'; // Get redirect URL or default to home
      this.router.navigate([redirectUrl]); // Redirect to intended page
      localStorage.removeItem('redirectUrl'); // Clear the redirect URL
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
