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
    // JSONPlaceholder no persiste datos: todo POST devuelve el mismo id (101),
    // así que asignamos un id local único para poder editar/borrar sin colisiones.
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
      // Los ids locales (>= 1000) no existen en el backend simulado, así que
      // el PUT responde 500; igualmente confirmamos el cambio del lado cliente.
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
      // JSONPlaceholder no tiene un campo "rating" real: los posts semilla (1-100)
      // no lo traen, así que derivamos uno estable a partir del id para poder mostrarlo.
      rating: post.rating ?? ((post.id - 1) % 5) + 1
    };
  }
}
