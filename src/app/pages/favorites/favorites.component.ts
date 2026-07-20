import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Book } from '../../models/book.model';
import { FavoritesService } from '../../services/favorites.service';
import { BookListComponent } from '../../components/book-list/book-list.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  private favoritesService = inject(FavoritesService);

  favorites = toSignal(this.favoritesService.favorites$, { initialValue: [] as Book[] });

  favoriteIds = toSignal(
    this.favoritesService.favorites$.pipe(map((favs) => new Set(favs.map((b) => b.id)))),
    { initialValue: new Set<string>() }
  );

  onToggleFavorite(book: Book): void {
    this.favoritesService.toggle(book);
  }
}
