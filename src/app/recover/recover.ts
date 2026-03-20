import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-recover',
  imports: [CommonModule, FormsModule],
  template: `
<div class="recover-wrapper">

  <div class="recover-card">

    <div class="brand">
      <div class="logo">🔐</div>
      <h1>Recover Master Password</h1>
      <p>Verify your identity to reset your password</p>
    </div>

    <!-- STEP 1 -->
    <div *ngIf="step === 1" class="form">

      <div class="input-group">
        <label>Username</label>
        <input [(ngModel)]="username"
               placeholder="Enter your username">
      </div>

      <button (click)="fetchQuestions()">Next</button>

    </div>

    <!-- STEP 2 -->
    <div *ngIf="step === 2" class="form">

      <div class="qa-block" *ngFor="let q of questions; let i = index">

        <label class="question">{{q}}</label>

        <input [(ngModel)]="answers[i]"
               placeholder="Enter answer">

      </div>

      <div class="input-group">
        <label>New Master Password</label>
        <input [(ngModel)]="newPassword"
               type="password"
               placeholder="Enter new master password">
      </div>

      <button (click)="recover()">Reset Password</button>

    </div>

    <p class="success" *ngIf="successMessage">{{successMessage}}</p>
    <p class="error" *ngIf="errorMessage">{{errorMessage}}</p>

  </div>

</div>

`,
styles: [`

/* BACKGROUND */
.recover-wrapper {

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
.recover-card {

  width: 460px;

  padding: 45px;

  background: rgba(255,255,255,0.08);

  backdrop-filter: blur(18px);

  border-radius: 20px;

  border: 1px solid rgba(255,255,255,0.15);

  box-shadow: 0 30px 70px rgba(0,0,0,0.45);

  color: white;

}


/* BRAND */
.brand {

  text-align: center;
  margin-bottom: 25px;

}

.logo {

  font-size: 32px;
  margin-bottom: 10px;

}

h1 {

  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;

}

.brand p {

  font-size: 14px;
  color: rgba(255,255,255,0.7);

}


/* FORM */
.form {

  margin-top: 20px;

}

.input-group {

  display: flex;
  flex-direction: column;
  margin-bottom: 18px;

}

.question {

  font-size: 13px;
  margin-bottom: 6px;
  color: rgba(255,255,255,0.85);

}

input {

  padding: 14px;

  border-radius: 12px;

  border: 1px solid rgba(255,255,255,0.2);

  background: rgba(255,255,255,0.12);

  color: white;

  font-size: 14px;

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

  padding: 14px;

  margin-top: 10px;

  border-radius: 12px;

  border: none;

  background: linear-gradient(90deg,#2563eb,#1e40af);

  color: white;

  font-weight: 600;

  cursor: pointer;

}

button:hover {

  transform: translateY(-1px);
  box-shadow: 0 12px 30px rgba(37,99,235,0.5);

}


/* QA BLOCK */
.qa-block {

  margin-bottom: 14px;

}


/* MESSAGES */
.success {

  margin-top: 15px;
  color: #4ade80;
  text-align: center;

}

.error {

  margin-top: 15px;
  color: #f87171;
  text-align: center;

}

`]
})
export class Recover {

  username = '';
  questions: string[] = [];
  answers: string[] = [];
  newPassword = '';

  step = 1;

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  fetchQuestions() {

    this.http.get<string[]>(
      `${environment.apiUrl}/auth/recover/questions?username=${this.username}`
    ).subscribe({
      next: (res) => {
        this.questions = res;
        this.answers = new Array(res.length);
        this.step = 2;
      },
      error: () => {
        this.errorMessage = "User not found";
      }
    });
  }



recover() {

  this.http.post<string>(
    `${environment.apiUrl}/auth/recover`,
    {
      username: this.username,
      answers: this.answers,
      newPassword: this.newPassword
    },
    { responseType: 'text' as 'json' }   // 👈 IMPORTANT
  ).subscribe({
    next: (res: any) => {
      this.successMessage = res;   // show backend message
      this.errorMessage = "";
    },
    error: () => {
      this.errorMessage = "Recovery failed";
      this.successMessage = "";
    }
  });
}

}