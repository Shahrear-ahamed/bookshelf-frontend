import { bookShelfApi } from "../../api/apiSlice";

interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
}

const bookApi = bookShelfApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
      }),
    }),
    addNewBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/books/add-new-book",
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddNewBookMutation } = bookApi;
