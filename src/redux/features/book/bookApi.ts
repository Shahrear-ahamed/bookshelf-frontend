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
    getMyBooks: builder.query({
      query: () => ({
        url: "/books/my-books",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["myBook"],
    }),
    getSingleBook: builder.query({
      query: (id: string) => ({
        url: `/books/${id}`,
      }),
    }),
    addNewBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/books/add-new-book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["allBook", "homeBook", "myBook"],
    }),
  }),
});

export const {
  useGetHomeBooksQuery,
  useGetMyBooksQuery,
  useAddNewBookMutation,
  useGetSingleBookQuery,
} = bookApi;
