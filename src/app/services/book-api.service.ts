import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book, OpenLibrarySearchResponse } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookApiService {
  private readonly searchUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Book[]> {
    const params = {
      q: query,
      limit: '24',
      fields: 'key,title,author_name,first_publish_year,cover_i'
    };

    return this.http.get<OpenLibrarySearchResponse>(this.searchUrl, { params }).pipe(
      map((response) =>
        response.docs.map((doc) => ({
          id: doc.key,
          title: doc.title,
          authors: doc.author_name ?? ['Autor desconocido'],
          firstPublishYear: doc.first_publish_year ?? null,
          coverUrl: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : null
        }))
      )
    );
  }
}
