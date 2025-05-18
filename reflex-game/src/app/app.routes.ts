import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./pages/game/game.component').then(m => m.GameComponent),
  },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./pages/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard]
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./pages/results/results.component').then(m => m.ResultsComponent), canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent), canActivate: [publicGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.RegisterComponent), canActivate: [publicGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home', // Vagy egy 'NotFoundComponent'-ra
  },
];
