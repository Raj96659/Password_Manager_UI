import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
template: `
<div class="register-wrapper">

  <div class="register-card">

    <!-- HEADER -->
    <div class="header">
      <div class="logo">🔐</div>
      <h1><span>REV</span> Password Manager</h1>
      <p>Create your secure vault account</p>
    </div>

    <div class="register-grid">

      <!-- LEFT -->
      <div class="column">

        <div class="section-header">Basic Information</div>

        <div class="input-group">
          <label>Email</label>
          <input [(ngModel)]="email" name="email" placeholder="Enter your email">
        </div>

        <div class="input-group">
          <label>Username</label>
          <input [(ngModel)]="username" name="username" placeholder="Choose username">
        </div>

        <div class="input-group">
          <label>Password</label>
          <input [(ngModel)]="password" name="password" type="password" placeholder="Create password">
        </div>

        <div class="input-group">
          <label>Full Name</label>
          <input [(ngModel)]="name" name="name" placeholder="Enter full name">
        </div>

        <div class="input-group">
          <label>Phone</label>
          <input [(ngModel)]="phone" name="phone" placeholder="Enter phone number">
        </div>

      </div>


      <!-- RIGHT -->
      <div class="column">

        <div class="section-header">
          Security Questions
        </div>

        <div *ngFor="let q of securityQuestions; let i = index"
             class="question-block">

          <div class="input-group">
            <label>Question {{i+1}}</label>
            <input [(ngModel)]="securityQuestions[i].question"
                   name="question{{i}}"
                   placeholder="Enter security question">
          </div>

          <div class="input-group">
            <label>Answer {{i+1}}</label>
            <input [(ngModel)]="securityQuestions[i].answer"
                   name="answer{{i}}"
                   placeholder="Enter answer">
          </div>

        </div>

      </div>

    </div>

    <button class="register-btn" (click)="register()">
      Create Account
    </button>

    <p class="success" *ngIf="successMessage">
      {{successMessage}}
    </p>

    <p class="error" *ngIf="errorMessage">
      {{errorMessage}}
    </p>

  </div>

</div>
`,
styles: [`

/* BACKGROUND */
.register-wrapper {

  min-height:100vh;

  display:flex;
  justify-content:center;
  align-items:center;

  padding:40px;

  background:
  linear-gradient(135deg,#0f172a,#1e293b,#2563eb);

  background-size:200% 200%;
  animation:bgMove 12s ease infinite;
}

@keyframes bgMove {

  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}

}


/* CARD */
.register-card {

  width:100%;
  max-width:1100px;

  padding:50px;

  border-radius:22px;

  background:rgba(255,255,255,0.08);
  backdrop-filter:blur(20px);

  border:1px solid rgba(255,255,255,0.18);

  box-shadow:0 30px 70px rgba(0,0,0,0.45);

  color:white;
}


/* HEADER */
.header {

  text-align:center;
  margin-bottom:35px;
}

.logo {

  font-size:32px;
  margin-bottom:10px;
}

h1 {

  font-size:28px;
  font-weight:700;
}

h1 span {

  color:#60a5fa;
}

.header p {

  font-size:14px;
  opacity:0.8;
  margin-top:4px;
}


/* GRID */
.register-grid {

  display:grid;
  grid-template-columns:1fr 1fr;
  gap:40px;
}


/* SECTION HEADER */
.section-header {

  font-weight:600;
  margin-bottom:20px;
  font-size:16px;

  color:#93c5fd;
}


/* INPUT GROUP */
.input-group {

  display:flex;
  flex-direction:column;
  margin-bottom:18px;
}

label {

  font-size:13px;
  margin-bottom:6px;
  opacity:0.85;
}

input {

  padding:14px 16px;

  border-radius:12px;

  border:1px solid rgba(255,255,255,0.2);

  background:rgba(255,255,255,0.12);

  color:white;
  font-size:14px;

  transition:0.2s;
}

input::placeholder {

  color:rgba(255,255,255,0.6);
}

input:focus {

  outline:none;

  border-color:#60a5fa;

  box-shadow:0 0 0 3px rgba(96,165,250,0.3);
}


/* BUTTON */
.register-btn {

  margin-top:25px;

  width:100%;

  padding:15px;

  border:none;
  border-radius:14px;

  background:linear-gradient(90deg,#2563eb,#1e40af);

  color:white;

  font-size:16px;
  font-weight:600;

  cursor:pointer;

  transition:0.25s;
}

.register-btn:hover {

  transform:translateY(-2px);

  box-shadow:0 15px 35px rgba(37,99,235,0.5);
}


/* SUCCESS */
.success {

  margin-top:15px;

  background:#16a34a33;

  padding:12px;

  border-radius:8px;

  text-align:center;
}


/* ERROR */
.error {

  margin-top:15px;

  background:#dc262633;

  padding:12px;

  border-radius:8px;

  text-align:center;
}


/* RESPONSIVE */
@media(max-width:900px){

  .register-grid{

    grid-template-columns:1fr;
  }

  .register-card{

    padding:30px;
  }

}

`]
})
export class Register {

  email = '';
  username = '';
  password = '';
  name = '';
  phone = '';

  securityQuestions = [
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ];

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {

    if (!this.email || !this.username || !this.password) {
      this.errorMessage = "Email, Username and Password are required";
      return;
    }

    if (this.securityQuestions.some(q => !q.question || !q.answer)) {
      this.errorMessage = "All security questions must be filled";
      return;
    }

    const body = {
      email: this.email,
      username: this.username,
      password: this.password,
      name: this.name,
      phone: this.phone,
      securityQuestions: this.securityQuestions
    };

    this.http.post<any>(`${environment.apiUrl}/auth/register`, body)
      .subscribe({
        next: () => {

          this.http.post<any>(`${environment.apiUrl}/auth/login`, {
            username: this.username,
            masterPassword: this.password
          }).subscribe(loginRes => {

            localStorage.setItem('token', loginRes.token);
            this.router.navigate(['/app/dashboard']);
          });

        },
        error: (err) => {
          this.errorMessage = err.error || "Registration failed";
          this.successMessage = "";
        }
      });
  }
}