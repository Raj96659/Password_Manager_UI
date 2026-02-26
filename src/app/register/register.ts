// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   standalone: true,
//   selector: 'app-register',
//   imports: [CommonModule, FormsModule],
//   template: `
// <div class="form-wrapper">

//   <div class="form-card">

//     <h2>Create Account</h2>

//     <div class="form-grid">

//       <!-- LEFT SIDE -->
//       <div class="left">

//         <input [(ngModel)]="email" name="email" placeholder="Email">
//         <input [(ngModel)]="username" name="username" placeholder="Username">
//         <input [(ngModel)]="password" name="password" type="password" placeholder="Password">
//         <input [(ngModel)]="name" name="name" placeholder="Full Name">
//         <input [(ngModel)]="phone" name="phone" placeholder="Phone">

//       </div>

//       <!-- RIGHT SIDE -->
//       <div class="right">

//         <div class="section-title">
//           Security Questions (Minimum 3)
//         </div>

//         <div *ngFor="let q of securityQuestions; let i = index">
//           <input [(ngModel)]="securityQuestions[i].question" 
//                  name="question{{i}}" 
//                  placeholder="Question">

//           <input [(ngModel)]="securityQuestions[i].answer" 
//                  name="answer{{i}}" 
//                  placeholder="Answer">
//         </div>

//       </div>

//     </div>

//     <button (click)="register()">Register</button>

//     <p class="success" *ngIf="successMessage">
//       {{successMessage}}
//     </p>

//     <p class="error" *ngIf="errorMessage">
//       {{errorMessage}}
//     </p>

//   </div>

// </div>
//   `,
//   styles: [`
// .form-wrapper {
//   display:flex;
//   justify-content:center;
//   padding:40px;
// }

// .form-card {
//   background:white;
//   width:900px;
//   padding:40px;
//   border-radius:12px;
//   box-shadow:0 10px 30px rgba(0,0,0,0.08);
// }

// h2 {
//   text-align:center;
//   margin-bottom:30px;
// }

// .form-grid {
//   display:grid;
//   grid-template-columns: 1fr 1fr;
//   gap:40px;
// }

// .left input,
// .right input {
//   width:100%;
//   padding:10px;
//   margin-bottom:12px;
//   border:1px solid #d1d5db;
//   border-radius:6px;
//   transition:0.2s;
// }

// input:focus {
//   outline:none;
//   border-color:#2563eb;
//   box-shadow:0 0 0 2px rgba(37,99,235,0.2);
// }

// .section-title {
//   font-weight:600;
//   margin-bottom:10px;
// }

// button {
//   margin-top:25px;
//   width:100%;
//   padding:12px;
//   background:linear-gradient(90deg,#2563eb,#1d4ed8);
//   color:white;
//   border:none;
//   border-radius:6px;
//   font-weight:600;
//   cursor:pointer;
// }

// button:hover {
//   opacity:0.9;
// }

// .success {
//   background:#dcfce7;
//   color:#16a34a;
//   padding:10px;
//   border-radius:6px;
//   text-align:center;
//   margin-top:15px;
//   font-weight:500;
// }

// .error {
//   background:#fee2e2;
//   color:#dc2626;
//   padding:10px;
//   border-radius:6px;
//   text-align:center;
//   margin-top:15px;
//   font-weight:500;
// }
// `]
// })
// export class Register {

//   email = '';
//   username = '';
//   password = '';
//   name = '';
//   phone = '';

//   securityQuestions = [
//     { question: '', answer: '' },
//     { question: '', answer: '' },
//     { question: '', answer: '' }
//   ];

//   successMessage = '';
//   errorMessage = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   register() {

//     if (!this.email || !this.username || !this.password) {
//       this.errorMessage = "Email, Username and Password are required";
//       return;
//     }

//     if (this.securityQuestions.some(q => !q.question || !q.answer)) {
//       this.errorMessage = "All security questions must be filled";
//       return;
//     }

//     const body = {
//       email: this.email,
//       username: this.username,
//       password: this.password,
//       name: this.name,
//       phone: this.phone,
//       securityQuestions: this.securityQuestions
//     };

//     // Step 1: Register
//     this.http.post<any>('http://localhost:8080/auth/register', body)
//       .subscribe({
//         next: () => {

//           // Step 2: Auto-login
//           this.http.post<any>('http://localhost:8080/auth/login', {
//             username: this.username,
//             masterPassword: this.password
//           }).subscribe(loginRes => {

//             localStorage.setItem('token', loginRes.token);

//             // Step 3: Redirect
//             this.router.navigate(['/app/dashboard']);
//           });

//         },
//         error: (err) => {
//           this.errorMessage = err.error || "Registration failed";
//           this.successMessage = "";
//         }
//       });
//   }
// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

    this.http.post<any>('http://localhost:8080/auth/register', body)
      .subscribe({
        next: () => {

          this.http.post<any>('http://localhost:8080/auth/login', {
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