export interface Book {
  id: string;
  title: string;
  authors: string[];
  firstPublishYear: number | null;
  coverUrl: string | null;
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryDoc[];
}
