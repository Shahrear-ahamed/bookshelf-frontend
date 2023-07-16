import { bookShelfApi } from "../../api/apiSlice";

interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
}

const bookApi = bookShelfApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeBooks: builder.query({
      query: () => ({
        url: "/books",
      }),
      providesTags: ["homeBook", "allBook"],
    }),
    addNewBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/books/add-new-book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["allBook", "homeBook"],
    }),
  }),
});

export const { useGetHomeBooksQuery, useAddNewBookMutation } = bookApi;
