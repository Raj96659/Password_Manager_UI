import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-vault',
  imports: [CommonModule, FormsModule],
  template: `
<div class="vault-container">

  <h2 class="title">Password Vault</h2>

  <!-- TOOLBAR -->
  <div class="toolbar">
    <input [(ngModel)]="searchKeyword" placeholder="🔍 Search account..." />

    <select [(ngModel)]="selectedCategory">
      <option value="">All Categories</option>
      <option>Social Media</option>
      <option>Banking</option>
      <option>Email</option>
      <option>Shopping</option>
      <option>Work</option>
      <option>Other</option>
    </select>

    <select [(ngModel)]="sortBy">
      <option value="">Sort By</option>
      <option value="accountName">Name</option>
      <option value="createdAt">Date Added</option>
      <option value="category">Category</option>
    </select>

    <button (click)="applyFilters()">Apply</button>
    <button (click)="load()">Reset</button>
    <button (click)="loadFavorites()">Favorites</button>
  </div>

  <!-- LOADER -->
  <div *ngIf="isLoading" class="loader">Loading...</div>

  <!-- ADD / UPDATE -->
  <div class="add-card">
    <h3>{{ editMode ? 'Update Password' : 'Add New Password' }}</h3>

    <div class="form-grid">
      <input [(ngModel)]="masterPassword" type="password" placeholder="Master Password" />
      <input [(ngModel)]="accountName" placeholder="Account Name" />
      <input [(ngModel)]="username" placeholder="Username" />
      <input [(ngModel)]="password" placeholder="Password" />
      <input [(ngModel)]="category" placeholder="Category" />
    </div>



  <div class="form-actions">

  <button
    *ngIf="!editMode"
    class="primary"
    (click)="add()">
    Add Password
  </button>

  <button
    *ngIf="editMode"
    class="primary"
    (click)="update()">
    Update
  </button>

  <button
    *ngIf="editMode"
    class="secondary"
    (click)="cancelEdit()">
    Cancel
  </button>

</div>

  </div>

  <!-- PASSWORD GRID -->
  <div class="password-grid">
    <div class="password-card" *ngFor="let p of passwords()">

      <div class="card-header">
        <h4>{{p.accountName}}</h4>
        <span class="category">{{p.category}}</span>
      </div>

      <div class="card-body">
        <p>
          {{p.username}}
          <span class="copy" (click)="copy(p.username)">📋</span>
        </p>
        <div class="password-preview">••••••••</div>
      </div>

      <div class="card-actions">
        <button (click)="openView(p.id)">View</button>
        <button (click)="edit(p)">Edit</button>
        <button (click)="toggleFavorite(p.id)">
          {{p.favorite ? '⭐' : '☆'}}
        </button>
        <button class="danger" (click)="confirmDelete(p.id)">
          Delete
        </button>
      </div>

    </div>
  </div>

  <!-- VIEW MODAL -->
  <div class="modal" *ngIf="showViewModal">
    <div class="modal-content">
      <h3>Re-enter Master Password</h3>

      <input [(ngModel)]="viewMasterPassword"
             type="password"
             placeholder="Master Password" />

<div class="modal-actions">
  <button class="primary" (click)="verifyView()">Verify</button>
  <button class="secondary" (click)="closeView()">Cancel</button>
</div>
      <div *ngIf="viewedPassword">
        <h4>Decrypted Password:</h4>
        <p>{{viewedPassword}}</p>
      </div>
    </div>
  </div>

  <!-- DELETE MODAL -->
  <div class="modal" *ngIf="showDeleteModal">
    <div class="modal-content">
      <h3>Delete Password?</h3>
      <p>This action cannot be undone.</p>

      <button (click)="cancelDelete()">Cancel</button>
      <button class="danger" (click)="deleteConfirmed()">Yes Delete</button>
    </div>
  </div>

  <!-- TOAST -->
  <div class="toast" *ngIf="showToast">
    {{toastMessage}}
  </div>

</div>
`,
styles: [`

.vault-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px 40px 10px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.toolbar input {
  width: 320px;                 /* fixed width instead of 1fr */
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #ffffff;
}

.toolbar select {
  width: 180px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #ffffff;
}

.toolbar button {
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.form-actions {
  margin-top: 25px;
  display: flex;
  gap: 14px;
}

.form-actions button {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.form-actions .primary {
  background: #2563eb;
  color: white;
}

.form-actions .secondary {
  background: #e2e8f0;
  color: #1e293b;
}

.add-card {
  background: white;
  padding: 40px;              /* increased from 25px */
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  margin-bottom: 40px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;                  /* more visible spacing */
  margin-top: 25px;
}

.form-grid input {
  width: 100%;
  padding: 16px 18px;         /* taller inputs */
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #f9fafb;        /* slight contrast */
  font-size: 14px;
  box-sizing: border-box;
}

.form-actions {
  margin-top: 20px;
}

.form-actions button {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.password-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.password-card {
  background: white;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.password-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.category {
  font-size: 12px;
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 8px;
  border-radius: 6px;
}

.card-body {
  margin-bottom: 12px;
  color: #475569;
}

.password-preview {
  font-family: monospace;
  letter-spacing: 2px;
  color: #94a3b8;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.card-actions button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.card-actions button:first-child {
  background: #2563eb;
  color: white;
}

.danger {
  background: #dc2626;
  color: white;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 14px;
  width: 350px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #111827;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
}

.loader {
  margin-bottom: 15px;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.modal-actions button {
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.modal-actions .primary {
  background: #2563eb;
  color: white;
}

.modal-actions .secondary {
  background: #e2e8f0;
  color: #1e293b;
}



`]
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

  // add() {
  //   this.http.post(
  //     `${this.baseUrl}/add?masterPassword=${this.masterPassword}`,
  //     { accountName: this.accountName, username: this.username, password: this.password, category: this.category }
  //   ).subscribe(() => {
  //     this.toast("Added");
  //     this.load();
  //   });
  // }

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

      // 🔥 CLEAR FORM
      this.accountName = '';
      this.username = '';
      this.password = '';
      this.category = '';

      // optional
      // this.masterPassword = '';

      this.load(); // reload list
    },
    error: (err) => {
      console.error(err);
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

      this.cancelEdit(); // clears everything properly

    },

    error: () => {
      this.toast("Update failed");
    }

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