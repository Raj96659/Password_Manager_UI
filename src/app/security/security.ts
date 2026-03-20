import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-security',
  imports: [CommonModule, FormsModule],
  templateUrl: './security.html',
  styleUrls: ['./security.css']
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