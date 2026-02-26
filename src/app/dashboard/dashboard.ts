import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="page">

    <h2>Password Security Overview</h2>

    <p class="subtitle">
      Monitor the health of your stored passwords.
    </p>

    <input 
  [(ngModel)]="masterPassword" 
  type="password" 
  placeholder="Enter Master Password"
/>

<button (click)="load()">Load Dashboard</button>

    <div class="dashboard-grid">

      <div class="card stat">
        <h4>Total Passwords</h4>
        <p>{{ data()?.totalPasswords ?? 0 }}</p>
        <span>All saved accounts</span>
      </div>

      <div class="card stat warning">
        <h4>Weak Passwords</h4>
        <p>{{ data()?.weakPasswords ?? 0 }}</p>
        <span>Easy to guess passwords</span>
      </div>

      <div class="card stat danger">
        <h4>Reused Passwords</h4>
        <p>{{ data()?.reusedPasswords ?? 0 }}</p>
        <span>Used across multiple accounts</span>
      </div>

      <div class="card stat info">
        <h4>Old Passwords</h4>
        <p>{{ data()?.oldPasswords ?? 0 }}</p>
        <span>Not changed recently</span>
      </div>

    </div>

    <button (click)="load()">
      Refresh Dashboard
    </button>

  </div>
  `,
  styles: [`

  .subtitle {
    color: #6b7280;
    margin-bottom: 25px;
    font-size: 14px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
  }

  .stat {
    text-align: center;
    transition: 0.2s ease;
  }

  .stat:hover {
    transform: translateY(-4px);
  }

  .stat h4 {
    font-size: 14px;
    margin-bottom: 10px;
    color: #334155;
  }

  .stat p {
    font-size: 28px;
    font-weight: bold;
    margin: 8px 0;
  }

  .stat span {
    font-size: 12px;
    color: #6b7280;
  }

  /* Optional color accents */
  .warning p {
    color: #f59e0b;
  }

  .danger p {
    color: #dc2626;
  }

  .info p {
    color: #2563eb;
  }

  button {
    margin-top: 10px;
  }

  .card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(8px);
  transition: 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

  `]
})
export class Dashboard {

  masterPassword = '';
  data = signal<any>(null);

  // constructor(private http: HttpClient) {
  //   this.load(); // auto-load on page open
  // }

  constructor(private http: HttpClient) {}

load() {

  if (!this.masterPassword) {
    alert("Enter master password");
    return;
  }

  this.http.post(
    'http://localhost:8080/vault/dashboard',
    { masterPassword: this.masterPassword }
  ).subscribe({
    next: (res: any) => this.data.set(res),
    error: (err) => console.error("Dashboard error:", err)
  });
}
}