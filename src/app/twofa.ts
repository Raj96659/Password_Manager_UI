import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-2fa',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container">

    <div class="card">
      <h2>Two-Factor Authentication</h2>
      <p>Please enter the OTP sent to your email</p>

      <input
        [(ngModel)]="otp"
        placeholder="Enter OTP"
        maxlength="6"
      />

      <button (click)="verify()" [disabled]="loading">
        {{ loading ? 'Verifying...' : 'Verify OTP' }}
      </button>

      <p class="error" *ngIf="error">{{error}}</p>
    </div>

  </div>
  `,
  styles: [`
    .container {
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      background:#f1f5f9;
      font-family:Arial;
    }

    .card {
      background:white;
      padding:30px;
      border-radius:8px;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);
      width:300px;
      text-align:center;
    }

    input {
      width:100%;
      padding:10px;
      margin:15px 0;
      border:1px solid #ccc;
      border-radius:4px;
    }

    button {
      width:100%;
      padding:10px;
      background:#2563eb;
      color:white;
      border:none;
      border-radius:4px;
      cursor:pointer;
    }

    button:disabled {
      background:#93c5fd;
    }

    .error {
      color:red;
      margin-top:10px;
    }
  `]
})
export class TwoFA {

  otp = '';
  error = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  verify() {

  if (!this.otp) {
    this.error = "OTP is required";
    return;
  }

  const username = localStorage.getItem("2faUser");

  if (!username) {
    this.error = "Session expired. Please login again.";
    return;
  }

  this.loading = true;
  this.error = '';

  this.http.post(
    `http://localhost:8080/auth/verify-otp?username=${username}&otp=${this.otp}`,
    {}
  ).subscribe({
    next: (res: any) => {

      // Backend should return token here
      localStorage.removeItem("2faUser");

      localStorage.setItem("token", res.token);

      this.router.navigate(['/app/dashboard']);
    },
    error: () => {
      this.error = "Invalid OTP";
      this.loading = false;
    }
  });
}
}