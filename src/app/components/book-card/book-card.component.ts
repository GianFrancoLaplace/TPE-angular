import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  @Input() isFavorite = false;

  @Output() toggleFavorite = new EventEmitter<Book>();
}
