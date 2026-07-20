import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review, ReviewDraft } from '../../models/review.model';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnChanges {
  @Input() editingReview: Review | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<ReviewDraft>();
  @Output() cancelEdit = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    bookTitle: ['', [Validators.required, Validators.minLength(2)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingReview']) {
      if (this.editingReview) {
        this.form.setValue({
          bookTitle: this.editingReview.bookTitle,
          rating: this.editingReview.rating,
          comment: this.editingReview.comment
        });
      } else {
        this.form.reset({ bookTitle: '', rating: 5, comment: '' });
      }
    }
  }

  get bookTitle() {
    return this.form.controls.bookTitle;
  }

  get rating() {
    return this.form.controls.rating;
  }

  get comment() {
    return this.form.controls.comment;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.save.emit({
      bookTitle: value.bookTitle!.trim(),
      rating: value.rating!,
      comment: value.comment!.trim()
    });
  }

  onCancel(): void {
    this.form.reset({ bookTitle: '', rating: 5, comment: '' });
    this.cancelEdit.emit();
  }

  resetForm(): void {
    this.form.reset({ bookTitle: '', rating: 5, comment: '' });
  }
}
