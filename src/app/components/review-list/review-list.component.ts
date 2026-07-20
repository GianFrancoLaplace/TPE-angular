import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  @Input() reviews: Review[] = [];
  @Input() loading = false;
  @Input() deletingId: number | null = null;

  @Output() edit = new EventEmitter<Review>();
  @Output() delete = new EventEmitter<Review>();
}
