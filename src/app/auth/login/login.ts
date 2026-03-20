import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
<div class="login-wrapper">

  <div class="login-card">

    <div class="brand">
      <div class="logo">🔐</div>
      <h1><span>REV</span> Password Manager</h1>
      <p>Secure access to your encrypted vault</p>
    </div>

    <div class="form">

      <div class="input-group">
        <label>Username</label>
        <input [(ngModel)]="username"
               placeholder="Enter your username">
      </div>

      <div class="input-group">
        <label>Master Password</label>
        <input [(ngModel)]="masterPassword"
               type="password"
               placeholder="Enter your master password">
      </div>

      <button (click)="login()">Login</button>

      <div class="links">
        <a routerLink="/recover">Forgot Master Password?</a>
        <p>New user? <a routerLink="/register">Create Account</a></p>
      </div>

      <p class="error" *ngIf="errorMessage">{{errorMessage}}</p>

    </div>

  </div>

</div>
  `,
  styles: [`

/* BACKGROUND */
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #0f172a,
    #1e293b,
    #2563eb
  );

  background-size: 200% 200%;
  animation: gradientMove 10s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* CARD */
.login-card {
  width: 440px;
  padding: 50px 45px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);

  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.15);

  box-shadow: 0 30px 70px rgba(0,0,0,0.45);

  color: white;
}

/* BRAND */
.brand {
  text-align: center;
  margin-bottom: 35px;
}

.logo {
  font-size: 32px;
  margin-bottom: 12px;
}

h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}

h1 span {
  color: #60a5fa;
}

.brand p {
  font-size: 14px;
  color: rgba(255,255,255,0.75);
}

/* FORM */
.form {
  margin-top: 20px;
}

.input-group {
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 13px;
  margin-bottom: 6px;
  color: rgba(255,255,255,0.85);
}

input {
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.2);

  background: rgba(255,255,255,0.12);
  color: white;
  font-size: 15px;

  transition: 0.2s ease;
}

input::placeholder {
  color: rgba(255,255,255,0.6);
}

input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96,165,250,0.35);
}

/* BUTTON */
button {
  width: 100%;
  padding: 16px;
  margin-top: 8px;

  border-radius: 14px;
  border: none;

  background: linear-gradient(90deg,#2563eb,#1e40af);
  color: white;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.25s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(37,99,235,0.5);
}

/* LINKS */
.links {
  text-align: center;
  margin-top: 22px;
  font-size: 14px;
}

.links a {
  color: #93c5fd;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

/* ERROR */
.error {
  margin-top: 15px;
  color: #f87171;
  text-align: center;
  font-size: 14px;
}

`]
})
export class Login {

  username = '';
  masterPassword = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {

    if (!this.username || !this.masterPassword) {
      this.errorMessage = "All fields are required";
      return;
    }

    this.http.get<any>(environment.apiUrl +'/auth/login', {
      params: {
        username: this.username,
        masterPassword: this.masterPassword
      }
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/app/dashboard']);
      },
      error: () => {
        this.errorMessage = "Invalid credentials";
      }
    });
  }
}