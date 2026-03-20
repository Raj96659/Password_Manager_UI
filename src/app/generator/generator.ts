import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-generator',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="generator-container">

  <div class="generator-card">

    <h2>Password Generator</h2>

    <!-- LENGTH -->
    <div class="form-group">
      <label>Password Length</label>
      <input type="number" [(ngModel)]="length" />
    </div>

    <!-- OPTIONS -->
    <div class="options">
      <div class="option-row">
        <input type="checkbox" [(ngModel)]="includeUppercase" />
        <label>Uppercase</label>
      </div>

      <div class="option-row">
        <input type="checkbox" [(ngModel)]="includeNumbers" />
        <label>Numbers</label>
      </div>

      <div class="option-row">
        <input type="checkbox" [(ngModel)]="includeSymbols" />
        <label>Symbols</label>
      </div>
    </div>

    <!-- GENERATE BUTTON -->
    <div class="generate-section">
      <button (click)="generate()">Generate Password</button>
    </div>

    <!-- GENERATED PASSWORD DISPLAY -->
<div *ngIf="generated()" class="generated-box">

  <div class="generated-header">
    <span class="password-text">{{ generated() }}</span>
    <button class="copy-btn" (click)="copy()">Copy</button>
  </div>

  <div class="strength">
    Strength: 
    <span 
      [ngClass]="{
        weak: strength() === 'Weak',
        medium: strength() === 'Medium',
        strong: strength() === 'Strong',
        verystrong: strength() === 'Very Strong'
      }">
      {{ strength() }}
    </span>
  </div>

  <div class="copy-message" *ngIf="copiedMessage">
    {{ copiedMessage }}
  </div>

</div>

    <hr />

    <!-- SAVE TO VAULT -->
    <h3>Save To Vault</h3>

    <div class="form-grid">
      <input [(ngModel)]="masterPassword" placeholder="Master Password" type="password" />
      <input [(ngModel)]="accountName" placeholder="Account Name" />
      <input [(ngModel)]="username" placeholder="Username" />
      <input [(ngModel)]="category" placeholder="Category" />
    </div>

    <div class="save-section">
      <button (click)="save()">Save Password</button>
    </div>

  </div>

</div>
  `,
  styles: [`
.generator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.generator-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

.generator-card h2 {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
}

.options {
  margin-bottom: 25px;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.option-row input {
  width: 18px;
  height: 18px;
}

.generate-section {
  margin-bottom: 20px;
}

.generate-section button {
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.form-grid input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  box-sizing: border-box;
}

.save-section {
  margin-top: 20px;
}

.save-section button {
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.generated-box {
  margin-top: 20px;
  padding: 18px;
  background: #f1f5f9;
  border-radius: 12px;
}

.generated-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.password-text {
  font-family: monospace;
  font-size: 16px;
  font-weight: 600;
}

.copy-btn {
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.strength {
  font-size: 14px;
}

.weak { color: #dc2626; }
.medium { color: #f59e0b; }
.strong { color: #16a34a; }
.verystrong { color: #15803d; }

.copy-message {
  margin-top: 8px;
  font-size: 13px;
  color: #2563eb;
}
  `]
})
export class Generator {

  length = 12;
  includeUppercase = true;
  includeNumbers = true;
  includeSymbols = true;

  generated = signal('');
  strength = signal('');
  strengthScore = signal(0);

  masterPassword = '';
  accountName = '';
  username = '';
  category = '';

  successMessage = '';
  errorMessage = '';
  copiedMessage = '';

  constructor(private http: HttpClient) {}

  generate() {

    let chars = 'abcdefghijklmnopqrstuvwxyz';

    if (this.includeUppercase)
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (this.includeNumbers)
      chars += '0123456789';

    if (this.includeSymbols)
      chars += '!@#$%^&*()_+';

    let result = '';
    for (let i = 0; i < this.length; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    this.generated.set(result);
    this.calculateStrength(result);
    this.copiedMessage = '';
  }

  calculateStrength(password: string) {

    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    this.strengthScore.set(score);

    if (score <= 1) this.strength.set('Weak');
    else if (score === 2) this.strength.set('Medium');
    else if (score === 3) this.strength.set('Strong');
    else this.strength.set('Very Strong');
  }



copy() {
  navigator.clipboard.writeText(this.generated());
  this.copiedMessage = "Password copied to clipboard!";

  setTimeout(() => {
    this.generated.set('');
    this.strength.set('');
    this.strengthScore.set(0);
    this.copiedMessage = '';
  }, 1000);
}

  save() {

    if (!this.masterPassword || !this.generated()) {
      this.errorMessage = "Master password and generated password required";
      return;
    }

    this.http.post(
      `${environment.apiUrl}/vault/add?masterPassword=${this.masterPassword}`,
      {
        accountName: this.accountName,
        username: this.username,
        password: this.generated(),
        category: this.category
      }
    ).subscribe({
      next: () => {
        this.successMessage = "Saved to vault successfully";
        this.errorMessage = "";
        this.accountName = '';
        this.username = '';
        this.category = '';
      },
      error: () => {
        this.errorMessage = "Save failed";
        this.successMessage = "";
      }
    });
  }
}