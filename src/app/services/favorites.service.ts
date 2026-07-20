import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Book[]>([]);
  readonly favorites$ = this.favoritesSubject.asObservable();

  isFavorite(book: Book): boolean {
    return this.favoritesSubject.value.some((b) => b.id === book.id);
  }

  toggle(book: Book): void {
    const current = this.favoritesSubject.value;
    const exists = current.some((b) => b.id === book.id);
    const next = exists ? current.filter((b) => b.id !== book.id) : [...current, book];
    this.favoritesSubject.next(next);
  }

  remove(bookId: string): void {
    this.favoritesSubject.next(this.favoritesSubject.value.filter((b) => b.id !== bookId));
  }
}
