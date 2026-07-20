import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Libroteca · Buscar' },
  { path: 'favoritos', component: FavoritesComponent, title: 'Libroteca · Favoritos' },
  { path: 'resenas', component: ReviewsComponent, title: 'Libroteca · Reseñas' },
  { path: '**', redirectTo: '' }
];
