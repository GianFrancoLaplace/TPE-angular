import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Book } from '../../models/book.model';
import { BookApiService } from '../../services/book-api.service';
import { FavoritesService } from '../../services/favorites.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { BookListComponent } from '../../components/book-list/book-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, BookListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private bookApi = inject(BookApiService);
  private favoritesService = inject(FavoritesService);

  books = signal<Book[]>([]);
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  hasSearched = signal(false);

  favoriteIds = toSignal(
    this.favoritesService.favorites$.pipe(map((favs) => new Set(favs.map((b) => b.id)))),
    { initialValue: new Set<string>() }
  );

  onSearch(term: string): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.hasSearched.set(true);

    this.bookApi.search(term).subscribe({
      next: (books) => {
        this.books.set(books);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudo conectar con Open Library. Intentá nuevamente.');
        this.loading.set(false);
      }
    });
  }

  onToggleFavorite(book: Book): void {
    this.favoritesService.toggle(book);
  }
}
