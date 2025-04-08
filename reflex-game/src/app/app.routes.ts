import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResultsComponent } from './pages/results/results.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    
    { path: 'game', component: GameComponent },

    { path: 'leaderboard', component: LeaderboardComponent},

    { path: 'profile', component: ProfileComponent },

    { path: 'results', component: ResultsComponent},

    // Paraméterezett útvonalak
    // { path: 'task-edit/:id', component: TaskEditComponent },

    // Üres elérési út - alapértelmezett útvonal
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Wildcard útvonal - ha egyik útvonal sem egyezik
    { path: '**', component: HomeComponent }
   
    // Útvonalak egymásba ágyazása
    /*
    {
        path: 'tasks',
        title: 'Tasks',
        component: TasksComponent,
        children: [
            { path: 'completed', component: CompletedComponent },
        ]
    },
    */
];