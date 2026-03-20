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
  templateUrl: './login.html',
  styleUrls: ['./login.css']
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

    this.http.post<any>(environment.apiUrl + '/auth/login', {
      username: this.username,
      masterPassword: this.masterPassword
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