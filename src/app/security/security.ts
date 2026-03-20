import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-security',
  imports: [CommonModule, FormsModule],
  template: `
  <h2>Security Center</h2>

  <div class="card">
    <input 
      [(ngModel)]="masterPassword"
      placeholder="Enter Master Password"
      type="password"
    />

    <button (click)="load()">Run Security Audit</button>
  </div>

  <div *ngIf="audit()" class="audit-section">

    <!-- 🔐 Security Score -->
    <div class="score-box">
      <h3>Security Score</h3>

      <div class="score-container">
        <div class="score-bar"
             [style.width.%]="audit()?.securityScore"
             [ngClass]="getScoreClass(audit()?.securityScore)">
        </div>
      </div>

      <p class="score-text">
        {{audit()?.securityScore}} / 100
      </p>
    </div>

    <!-- Weak -->
    <div class="audit-box">
      <h3>Weak Passwords ({{audit()?.weakCount}})</h3>
      <ul>
        <li *ngFor="let w of audit()?.weakAccounts">
          {{w}}
        </li>
      </ul>
    </div>

    <!-- Reused -->
    <div class="audit-box">
      <h3>Reused Passwords ({{audit()?.reusedCount}})</h3>
      <ul>
        <li *ngFor="let r of audit()?.reusedAccounts">
          {{r}}
        </li>
      </ul>
    </div>

    <!-- Old -->
    <div class="audit-box">
      <h3>Old Passwords ({{audit()?.oldCount}})</h3>
      <ul>
        <li *ngFor="let o of audit()?.oldAccounts">
          {{o}}
        </li>
      </ul>
    </div>

  </div>
  `,
  styles: [`
    h2 {
      margin-bottom:20px;
    }

    .card {
      background:white;
      padding:20px;
      border-radius:8px;
      box-shadow:0 2px 6px rgba(0,0,0,0.1);
      margin-bottom:20px;
      max-width:400px;
    }

    input {
      width:100%;
      padding:8px;
      margin-bottom:10px;
      border:1px solid #ccc;
      border-radius:4px;
    }

    button {
      padding:8px 14px;
      background:#2563eb;
      color:white;
      border:none;
      border-radius:4px;
      cursor:pointer;
    }

    button:hover {
      background:#1d4ed8;
    }

    .audit-section {
      display:flex;
      gap:20px;
      flex-wrap:wrap;
    }

    .audit-box, .score-box {
      background:white;
      padding:20px;
      border-radius:8px;
      box-shadow:0 2px 6px rgba(0,0,0,0.1);
      width:250px;
    }

    .audit-box ul {
      padding-left:20px;
    }

    .audit-box li {
      font-size:14px;
      margin-bottom:4px;
    }

    /* 🔐 Score Meter */

    .score-container {
      width:100%;
      background:#e5e7eb;
      height:20px;
      border-radius:10px;
      overflow:hidden;
      margin-bottom:10px;
    }

    .score-bar {
      height:100%;
      transition:width 0.5s ease;
    }

    .green {
      background:#16a34a;
    }

    .yellow {
      background:#eab308;
    }

    .red {
      background:#dc2626;
    }

    .score-text {
      font-weight:bold;
      font-size:18px;
    }
  `]
})
export class Security {

  masterPassword = '';
  audit = signal<any>(null);

  constructor(private http: HttpClient) {}

  load() {

    if (!this.masterPassword) {
      alert("Master password required");
      return;
    }

    this.http.get(
      `${environment.apiUrl}/vault/audit?masterPassword=${this.masterPassword}`
    ).subscribe({
      next: (res: any) => {
        this.audit.set(res);
      },
      error: () => {
        alert("Invalid master password");
      }
    });
  }

  getScoreClass(score: number) {

    if (score >= 80) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  }
}