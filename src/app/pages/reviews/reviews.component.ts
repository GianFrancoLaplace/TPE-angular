import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { Review, ReviewDraft } from '../../models/review.model';
import { ReviewsService } from '../../services/reviews.service';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { ReviewListComponent } from '../../components/review-list/review-list.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReviewFormComponent, ReviewListComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @ViewChild(ReviewFormComponent) reviewForm!: ReviewFormComponent;

  reviews = signal<Review[]>([]);
  loading = signal(false);
  saving = signal(false);
  deletingId = signal<number | null>(null);
  errorMessage = signal<string | null>(null);
  editingReview = signal<Review | null>(null);

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.reviewsService.getAll().subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar las reseñas.');
        this.loading.set(false);
      }
    });
  }

  onSave(draft: ReviewDraft): void {
    this.saving.set(true);
    const editing = this.editingReview();

    const request$ = editing
      ? this.reviewsService.update(editing.id, draft)
      : this.reviewsService.create(draft);

    request$.subscribe({
      next: (review) => {
        if (editing) {
          this.reviews.update((list) => list.map((r) => (r.id === editing.id ? review : r)));
        } else {
          this.reviews.update((list) => [review, ...list]);
          this.reviewForm.resetForm();
        }
        this.editingReview.set(null);
        this.saving.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudo guardar la reseña. Intentá nuevamente.');
        this.saving.set(false);
      }
    });
  }

  onEdit(review: Review): void {
    this.editingReview.set(review);
  }

  onCancelEdit(): void {
    this.editingReview.set(null);
  }

  onDelete(review: Review): void {
    this.deletingId.set(review.id);
    this.reviewsService.delete(review.id).subscribe({
      next: () => {
        this.reviews.update((list) => list.filter((r) => r.id !== review.id));
        this.deletingId.set(null);
      },
      error: () => {
        this.errorMessage.set('No se pudo eliminar la reseña.');
        this.deletingId.set(null);
      }
    });
  }
}
