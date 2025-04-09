import { Routes } from '@angular/router';

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
      import('./pages/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./pages/results/results.component').then(m => m.ResultsComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
