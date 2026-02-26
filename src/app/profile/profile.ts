import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  template: `
<div class="profile-container">

  <h2 class="page-title">Profile Settings</h2>

  <div class="profile-grid">

    <!-- UPDATE PROFILE -->
    <div class="card">
      <h3>Update Profile</h3>

      <input [(ngModel)]="name" placeholder="Full Name">
      <input [(ngModel)]="email" placeholder="Email">
      <input [(ngModel)]="phone" placeholder="Phone">

      <button (click)="updateProfile()">Update Profile</button>
    </div>

    <!-- CHANGE PASSWORD -->
    <div class="card">
      <h3>Change Master Password</h3>

      <input [(ngModel)]="currentPassword" type="password" placeholder="Current Password">
      <input [(ngModel)]="newPassword" type="password" placeholder="New Password">

      <button (click)="changeMasterPassword()">Change Password</button>
    </div>

    <!-- TWO FACTOR -->
    <div class="card full-width">
      <h3>Two-Factor Authentication</h3>

      <button (click)="toggle2FA()">Toggle 2FA</button>
    </div>

  </div>

  <p class="success" *ngIf="successMessage">{{successMessage}}</p>
  <p class="error" *ngIf="errorMessage">{{errorMessage}}</p>

</div>
  `,
  styles: [`
    .profile-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 30px;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.card h3 {
  margin-bottom: 20px;
}

.card input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  margin-bottom: 15px;
  background: #f9fafb;
  box-sizing: border-box;
}

.card button {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.card button:hover {
  background: #1e40af;
}

.full-width {
  grid-column: span 2;
}

.success {
  margin-top: 20px;
  color: #16a34a;
  font-weight: 500;
}

.error {
  margin-top: 20px;
  color: #dc2626;
  font-weight: 500;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }
}
  `]
})
export class Profile {

  name = '';
  email = '';
  phone = '';

  currentPassword = '';
  newPassword = '';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  updateProfile() {

    this.http.put('http://localhost:8080/auth/profile', {
      name: this.name,
      email: this.email,
      phone: this.phone
    }).subscribe({
      next: () => {
        this.successMessage = "Profile updated successfully";
        this.errorMessage = "";
      },
      error: () => {
        this.errorMessage = "Update failed";
        this.successMessage = "";
      }
    });
  }

  changeMasterPassword() {

    this.http.put('http://localhost:8080/auth/change-master-password', {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.successMessage = "Master password changed successfully";
        this.errorMessage = "";
        this.currentPassword = '';
        this.newPassword = '';
      },
      error: () => {
        this.errorMessage = "Password change failed";
        this.successMessage = "";
      }
    });
  }

  toggle2FA() {

    this.http.put('http://localhost:8080/auth/2fa', {})
      .subscribe({
        next: (res: any) => {
          this.successMessage = res;
          this.errorMessage = "";
        },
        error: () => {
          this.errorMessage = "Failed to toggle 2FA";
          this.successMessage = "";
        }
      });
  }

}