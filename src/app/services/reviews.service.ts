import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { JsonPlaceholderPost, Review, ReviewDraft } from '../models/review.model';

const LOCAL_ID_START = 1000;

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  private nextLocalId = LOCAL_ID_START;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Review[]> {
    return this.http
      .get<JsonPlaceholderPost[]>(this.baseUrl, { params: { _limit: '8' } })
      .pipe(map((posts) => posts.map((post) => this.toReview(post))));
  }

  create(draft: ReviewDraft): Observable<Review> {
    const payload = this.toPost(draft);
    // JSONPlaceholder siempre devuelve id 101 en el POST, uso uno propio
    const localId = this.nextLocalId++;
    return this.http
      .post<JsonPlaceholderPost>(this.baseUrl, payload)
      .pipe(map(() => this.toReview({ ...payload, id: localId })));
  }

  update(id: number, draft: ReviewDraft): Observable<Review> {
    const payload = this.toPost(draft);
    const updated = this.toReview({ ...payload, id });

    return this.http.put<JsonPlaceholderPost>(`${this.baseUrl}/${id}`, payload).pipe(
      map(() => updated),
      // los ids locales tiran 500 en el PUT, igual confirmo el cambio
      catchError(() => of(updated))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(() => of(void 0)));
  }

  private toPost(draft: ReviewDraft): JsonPlaceholderPost {
    return { id: 0, title: draft.bookTitle, body: draft.comment, rating: draft.rating };
  }

  private toReview(post: JsonPlaceholderPost): Review {
    return {
      id: post.id,
      bookTitle: post.title,
      comment: post.body,
      // los posts semilla no traen rating, invento uno a partir del id
      rating: post.rating ?? ((post.id - 1) % 5) + 1
    };
  }
}
