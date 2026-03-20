import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-vault',
  imports: [CommonModule, FormsModule],
  templateUrl: './vault.html',
  styleUrls: ['./vault.css']
})
export class Vault {

  baseUrl = `${environment.apiUrl}/vault`;

  passwords = signal<any[]>([]);
  isLoading = false;

  masterPassword = '';
  accountName = '';
  username = '';
  password = '';
  category = '';

  editMode = false;
  editId: number | null = null;

  searchKeyword = '';
  selectedCategory = '';
  sortBy = '';

  viewId: number | null = null;
  viewMasterPassword = '';
  viewedPassword = '';
  showViewModal = false;

  deleteId: number | null = null;
  showDeleteModal = false;

  toastMessage = '';
  showToast = false;

  constructor(private http: HttpClient) {
    this.load();
  }

  toast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  load() {
    this.isLoading = true;
    this.http.get(`${this.baseUrl}/all`)
      .subscribe({
        next: (res: any) => {
          this.passwords.set(res);
          this.isLoading = false;
        },
        error: () => {
          this.toast("Failed to load");
          this.isLoading = false;
        }
      });
  }

  applyFilters() {

    this.isLoading = true;

    if (this.searchKeyword.trim()) {
      this.http.get(`${this.baseUrl}/search?keyword=${this.searchKeyword}`)
        .subscribe(res => {
          this.passwords.set(res as any);
          this.isLoading = false;
        });
      return;
    }

    if (this.selectedCategory) {
      this.http.get(`${this.baseUrl}/filter?category=${this.selectedCategory}`)
        .subscribe(res => {
          this.passwords.set(res as any);
          this.isLoading = false;
        });
      return;
    }

    if (this.sortBy) {
      this.http.get(`${this.baseUrl}/sorted?sortBy=${this.sortBy}`)
        .subscribe(res => {
          this.passwords.set(res as any);
          this.isLoading = false;
        });
      return;
    }

    this.load();
  }

  loadFavorites() {
    this.http.get(`${this.baseUrl}/favorites`)
      .subscribe(res => this.passwords.set(res as any));
  }

  add() {
    this.http.post(
      `${this.baseUrl}/add?masterPassword=${this.masterPassword}`,
      {
        accountName: this.accountName,
        username: this.username,
        password: this.password,
        category: this.category
      }
    ).subscribe({
      next: () => {
        this.toast("Added");

        this.accountName = '';
        this.username = '';
        this.password = '';
        this.category = '';

        this.load();
      }
    });
  }

  update() {

    if (this.editId === null) return;

    this.http.put(
      `${this.baseUrl}/update/${this.editId}?masterPassword=${this.masterPassword}`,
      {
        accountName: this.accountName,
        username: this.username,
        password: this.password,
        category: this.category
      }
    ).subscribe({
      next: () => {
        this.toast("Updated");
        this.load();
        this.cancelEdit();
      },
      error: () => this.toast("Update failed")
    });
  }

  edit(p: any) {
    this.editMode = true;
    this.editId = p.id;

    this.accountName = p.accountName;
    this.username = p.username;
    this.category = p.category;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editMode = false;
    this.editId = null;

    this.masterPassword = '';
    this.accountName = '';
    this.username = '';
    this.password = '';
    this.category = '';
  }

  verifyView() {
    if (!this.viewId) return;

    this.http.get<any>(
      `${this.baseUrl}/view/${this.viewId}?masterPassword=${this.viewMasterPassword}`
    ).subscribe(res => {
      this.viewedPassword = res.decryptedPassword;
      this.viewMasterPassword = '';
    });
  }

  openView(id: number) {
    this.viewId = id;
    this.showViewModal = true;
  }

  closeView() {
    this.showViewModal = false;
  }

  toggleFavorite(id: number) {
    this.http.put(`${this.baseUrl}/favorite/${id}`, {})
      .subscribe(() => this.load());
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }

  deleteConfirmed() {
    if (!this.deleteId) return;

    this.http.delete(`${this.baseUrl}/delete/${this.deleteId}`)
      .subscribe(() => {
        this.toast("Deleted");
        this.load();
        this.showDeleteModal = false;
      });
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
    this.toast("Copied");
  }
}