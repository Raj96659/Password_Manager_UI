// import { Component } from '@angular/core';
// import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

// @Component({
//   standalone: true,
//   selector: 'app-layout',
//   imports: [RouterOutlet, RouterLink, RouterLinkActive],
//   template: `
//   <div class="layout">

//     <!-- SIDEBAR -->
//     <div class="sidebar">

//       <div class="top">
//         <div class="brand">
//           <div class="logo">🔐</div>
//           <div class="app-name">
//             <span class="rev">REV</span> Password Manager
//           </div>
//         </div>

//         <nav>
//           <a routerLink="/app/dashboard" routerLinkActive="active">Dashboard</a>
//           <a routerLink="/app/vault" routerLinkActive="active">Vault</a>
//           <a routerLink="/app/generator" routerLinkActive="active">Generator</a>
//           <a routerLink="/app/security" routerLinkActive="active">Security</a>
//           <a routerLink="/app/profile" routerLinkActive="active">Profile</a>
//           <a routerLink="/app/backup" routerLinkActive="active">Backup</a>
//         </nav>
//       </div>

//       <div class="bottom">
//         <a class="logout" (click)="logout()">Logout</a>
//       </div>

//     </div>

//     <!-- MAIN CONTENT -->
//     <div class="main">

//       <!-- TOP HEADER BAR -->
//       <div class="topbar">
//         <div class="welcome">
//           Welcome,
//           <span class="username">{{ username }}</span>
//         </div>

//         <div class="avatar">
//           {{ usernameInitial }}
//         </div>
//       </div>

//       <div class="content">
//         <router-outlet></router-outlet>
//       </div>

//     </div>

//   </div>
//   `,
//   styles: [`

// .layout {
//   display: flex;
//   height: 100vh;
// }

// /* SIDEBAR */
// .sidebar {
//   width: 240px;
//   background: #0f172a;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 25px 20px;
// }

// .brand {
//   margin-bottom: 25px;
// }

// .logo {
//   font-size: 24px;
//   margin-bottom: 5px;
// }

// .app-name {
//   font-size: 15px;
//   font-weight: 600;
// }

// .rev {
//   color: #3b82f6;
//   font-weight: bold;
// }

// nav {
//   display: flex;
//   flex-direction: column;
// }

// nav a {
//   padding: 10px;
//   border-radius: 6px;
//   color: #cbd5e1;
//   text-decoration: none;
//   margin-bottom: 6px;
//   transition: 0.2s;
// }

// nav a:hover {
//   background: #1e293b;
// }

// nav a.active {
//   background: #2563eb;
//   color: white;
// }

// .logout {
//   padding: 10px;
//   border-radius: 6px;
//   background: #1e293b;
//   color: #f87171;
//   cursor: pointer;
//   text-align: center;
//   transition: 0.2s;
// }

// .logout:hover {
//   background: #dc2626;
//   color: white;
// }

// /* MAIN SECTION */
// .main {
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   background: #f1f5f9;
// }

// /* TOPBAR */
// .topbar {
//   height: 64px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   padding: 0 40px;

//   background: #ffffff;
//   border-bottom: 1px solid #e5e7eb;

//   box-shadow: 0 2px 6px rgba(0,0,0,0.04);
// }

// .welcome {
//   font-size: 14px;
//   color: #6b7280;
// }

// .username {
//   font-weight: 600;
//   color: #111827;
//   margin-left: 6px;
// }
// .user-section {
//   display: flex;
//   align-items: center;
//   gap: 12px;
// }

// .avatar {
//   width: 38px;
//   height: 38px;
//   border-radius: 50%;

//   background: linear-gradient(135deg, #2563eb, #1e40af);

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   color: white;
//   font-weight: 600;
//   font-size: 14px;

//   box-shadow: 0 4px 12px rgba(37,99,235,0.3);
//   cursor: pointer;
//   transition: 0.2s ease;
// }

// .avatar:hover {
//   transform: scale(1.05);
// }

// /* CONTENT AREA */
// .content {
//   flex: 1;
//   overflow-y: auto;
//   background: #f1f5f9;
//   padding: 40px;
// }
// `]
// })
// export class Layout {

//   username = 'User';
//   usernameInitial = 'U';

//   constructor(private router: Router) {
//     this.loadUsername();
//   }

//   loadUsername() {
//     const token = localStorage.getItem('token');

//     if (!token) return;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       this.username = payload.sub || payload.username || 'User';
//       this.usernameInitial = this.username.charAt(0).toUpperCase();
//     } catch {
//       this.username = 'User';
//       this.usernameInitial = 'U';
//     }
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('2faUser');
//     this.router.navigate(['']);
//   }
// }

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="layout">

    <!-- SIDEBAR -->
    <div class="sidebar">

      <div class="top">
        <div class="brand">
          <div class="logo">🔐</div>
          <div class="app-name">
            <span class="rev">REV</span> Password Manager
          </div>
        </div>

        <nav>
          <a routerLink="/app/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/app/vault" routerLinkActive="active">Vault</a>
          <a routerLink="/app/generator" routerLinkActive="active">Generator</a>
          <a routerLink="/app/security" routerLinkActive="active">Security</a>
          <a routerLink="/app/profile" routerLinkActive="active">Profile</a>
          <a routerLink="/app/backup" routerLinkActive="active">Backup</a>
        </nav>
      </div>

      <div class="bottom">
        <a class="logout" (click)="logout()">Logout</a>
      </div>

    </div>

    <!-- MAIN -->
    <div class="main">

      <!-- TOPBAR -->
      <div class="topbar">
        <div class="welcome">
          Welcome,
          <span class="username">{{ username }}</span>
        </div>

        <div class="avatar">
          {{ usernameInitial }}
        </div>
      </div>

      <!-- PAGE CONTENT -->
      <div class="content">
        <router-outlet></router-outlet>
      </div>

    </div>

  </div>
  `,
  styles: [`

/* LAYOUT */
.layout {
  display: flex;
  height: 100vh;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  background: linear-gradient(
    180deg,
    #0f172a 0%,
    #111827 100%
  );

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 30px 22px;
  box-shadow: 4px 0 25px rgba(0,0,0,0.25);
}

.brand {
  margin-bottom: 35px;
}

.logo {
  font-size: 28px;
  margin-bottom: 8px;
}

.app-name {
  font-size: 16px;
  font-weight: 600;
}

.rev {
  color: #3b82f6;
  font-weight: bold;
}

nav {
  display: flex;
  flex-direction: column;
}

nav a {
  padding: 12px 14px;
  border-radius: 10px;
  color: #cbd5e1;
  text-decoration: none;
  margin-bottom: 8px;

  font-size: 14px;
  font-weight: 500;

  transition: 0.25s ease;
}

nav a:hover {
  background: rgba(255,255,255,0.08);
  transform: translateX(4px);
}

nav a.active {
  background: linear-gradient(
    90deg,
    #2563eb,
    #1e40af
  );
  color: white;
}

.logout {
  padding: 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  color: #f87171;
  cursor: pointer;
  text-align: center;
  transition: 0.25s ease;
}

.logout:hover {
  background: #dc2626;
  color: white;
}

/* MAIN */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;

  background: linear-gradient(
    180deg,
    #f8fafc 0%,
    #eef2f7 100%
  );
}

/* TOPBAR */
.topbar {
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 50px;

  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);

  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
}

.welcome {
  font-size: 15px;
  color: #64748b;
}

.username {
  font-weight: 600;
  color: #111827;
  margin-left: 6px;
}

/* AVATAR */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #2563eb,
    #1e40af
  );

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: 600;

  box-shadow: 0 8px 20px rgba(37,99,235,0.35);
  transition: 0.2s ease;
}

.avatar:hover {
  transform: scale(1.08);
}

/* CONTENT */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 50px 60px;
}

`]
})
export class Layout {

  username = 'User';
  usernameInitial = 'U';

  constructor(private router: Router) {
    this.loadUsername();
  }

  loadUsername() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.sub || payload.username || 'User';
      this.usernameInitial = this.username.charAt(0).toUpperCase();
    } catch {
      this.username = 'User';
      this.usernameInitial = 'U';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('2faUser');
    this.router.navigate(['']);
  }
}