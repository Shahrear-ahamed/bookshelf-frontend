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
      providesTags: ["singleBook"],
    }),
    getSearchBooks: builder.query({
      query: (search: string) => ({
        url: `/books?searchTerm=${search}`,
      }),
    }),
    addNewBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/books/add-new-book",
        method: "POST",
        body: book,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["allBook", "homeBook", "myBook"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["allBook", "homeBook", "myBook"],
    }),
    updateBook: builder.mutation({
      query: ({ id, book }: { id: string; book: IBook }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: book,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["allBook", "homeBook", "myBook"],
    }),
    giveReview: builder.mutation({
      query: ({ id, review }: { id: string; review: string }) => ({
        url: `/books/review/${id}`,
        method: "PUT",
        body: { review },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["singleBook"],
    }),
  }),
});

export const {
  useGetHomeBooksQuery,
  useGetMyBooksQuery,
  useGetSearchBooksQuery,
  useAddNewBookMutation,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGiveReviewMutation,
} = bookApi;
