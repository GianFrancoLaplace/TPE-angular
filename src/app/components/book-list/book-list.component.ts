import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Input() favoriteIds: Set<string> = new Set();
  @Input() loading = false;
  @Input() emptyMessage = 'No se encontraron libros.';

  @Output() toggleFavorite = new EventEmitter<Book>();
}
