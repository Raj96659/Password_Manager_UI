import { Routes } from '@angular/router';

import { Layout } from './layout';
import { Login } from './auth/login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { Vault } from './vault/vault';
import { TwoFA } from './twofa';
import { Generator } from './generator/generator';
import { Security } from './security/security';
import { Profile } from './profile/profile';
import { Recover } from './recover/recover';
import { Backup } from './backup/backup';

import { authGuard } from './core/gaurds/auth-guard';

export const routes: Routes = [

  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'recover', component: Recover },
  { path: '2fa', component: TwoFA },

  {
    path: 'app',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'vault', component: Vault },
      { path: 'generator', component: Generator },
      { path: 'security', component: Security },
      { path: 'profile', component: Profile },
      { path: 'backup', component: Backup }
    ]
  },

  { path: '**', redirectTo: '' }

];