import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'game/:id',
    loadChildren: './features/game/game.module#GameModule'
  },
  { path: '**', redirectTo: 'home' }
];
