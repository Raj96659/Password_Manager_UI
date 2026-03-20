


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-backup',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="backup-container">

    <h2 class="page-title">Vault Backup</h2>

    <div class="backup-grid">

      <!-- EXPORT SECTION -->
      <div class="card">
        <h3>Export Vault</h3>

        <input [(ngModel)]="masterPassword"
               type="password"
               placeholder="Enter Master Password">

        <button (click)="exportVault()">Export Vault</button>
      </div>

      <!-- IMPORT SECTION -->
      <div class="card">
        <h3>Import Vault</h3>

        <textarea [(ngModel)]="importData"
                  placeholder="Paste encrypted backup data here"></textarea>

        <button (click)="importVault()">Import Vault</button>
      </div>

    </div>

    <p class="success" *ngIf="successMessage">{{successMessage}}</p>
    <p class="error" *ngIf="errorMessage">{{errorMessage}}</p>

  </div>
  `,
  styles: [`
    .backup-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .page-title {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 30px;
    }

    .backup-grid {
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

    input, textarea {
      width: 100%;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid #d1d5db;
      margin-bottom: 15px;
      background: #f9fafb;
      box-sizing: border-box;
      font-size: 14px;
    }

    textarea {
      min-height: 140px;
      resize: vertical;
    }

    button {
      padding: 10px 20px;
      border-radius: 10px;
      border: none;
      background: #2563eb;
      color: white;
      font-weight: 500;
      cursor: pointer;
    }

    button:hover {
      background: #1e40af;
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
      .backup-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class Backup {

  masterPassword = '';
  importData = '';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  exportVault() {

    if (!this.masterPassword) {
      this.errorMessage = "Master password required";
      return;
    }

    this.http.get(
    `${environment.apiUrl}/vault/backup/export?masterPassword=${this.masterPassword}`,
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        this.downloadFile(res);
        this.successMessage = "Vault exported successfully";
        this.errorMessage = "";
      },
      error: () => {
        this.errorMessage = "Export failed";
        this.successMessage = "";
      }
    });
  }

  importVault() {

    if (!this.masterPassword || !this.importData) {
      this.errorMessage = "All fields required";
      return;
    }

    this.http.post(
      `http://localhost:8080/vault/backup/import?masterPassword=${this.masterPassword}`,
      this.importData,
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        this.successMessage = "Vault imported successfully";
        this.errorMessage = "";
        this.importData = '';
      },
      error: () => {
        this.errorMessage = "Import failed";
        this.successMessage = "";
      }
    });
  }

  downloadFile(data: string) {

    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'vault-backup.txt';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}