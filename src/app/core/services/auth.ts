import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(this.baseUrl + '/login', data);
  }

  register(data: any) {
    return this.http.post<any>(this.baseUrl + '/register', data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}