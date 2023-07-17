export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  createdAt: string;
  updatedAt: string;
  reviews: string[];
  publicationDate: number;
}

export interface IReadingBookList {
  book: IBook;
  status: string;
  _id: string;
}
