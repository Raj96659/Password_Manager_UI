import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [RouterModule],
  template: `

<div class="landing">

  <!-- NAVBAR -->
  <header class="navbar">
    <div class="logo">🔐 REV Password Manager</div>
    <div class="actions">
      <a routerLink="/login">Login</a>
      <a routerLink="/register" class="btn">Get Started</a>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <h1>Secure Your Digital Life</h1>
    <p>
      Store, manage, and protect your passwords with enterprise-grade security.
    </p>

    <div class="cta">
      <a routerLink="/register" class="primary">Create Account</a>
      <a routerLink="/login" class="secondary">Login</a>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features">

    <div class="feature">
      <h3>🔐 Strong Encryption</h3>
      <p>AES-256 encryption with PBKDF2 key derivation</p>
    </div>

    <div class="feature">
      <h3>⚡ Fast Access</h3>
      <p>Quick and secure access to all your credentials</p>
    </div>

    <div class="feature">
      <h3>🛡 Security Audit</h3>
      <p>Detect weak, reused and old passwords instantly</p>
    </div>

    <div class="feature">
      <h3>🔑 Password Generator</h3>
      <p>Create strong passwords in one click</p>
    </div>

  </section>

</div>

  `,
  styles: [`

.landing {
  min-height: 100vh;
  background: linear-gradient(135deg,#0f172a,#1e293b,#2563eb);
  color: white;
  font-family: 'Inter', sans-serif;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
}

.logo {
  font-weight: bold;
}

.actions a {
  margin-left: 15px;
  text-decoration: none;
  color: white;
}

.actions .btn {
  background: #2563eb;
  padding: 8px 16px;
  border-radius: 6px;
}

/* HERO */
.hero {
  text-align: center;
  margin-top: 100px;
}

.hero h1 {
  font-size: 42px;
  margin-bottom: 15px;
}

.hero p {
  opacity: 0.8;
}

.cta {
  margin-top: 25px;
}

.cta a {
  margin: 10px;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
}

.primary {
  background: #2563eb;
  color: white;
}

.secondary {
  border: 1px solid white;
  color: white;
}

/* FEATURES */
.features {
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  padding: 40px;
}

.feature {
  background: rgba(255,255,255,0.08);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

  `]
})
export class Landing {}