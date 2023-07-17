import { bookShelfApi } from "../../api/apiSlice";

interface IUser {
  email: string;
  password: string;
}

const userApi = bookShelfApi.injectEndpoints({
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (payload: IUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload: IUser) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    addWishList: builder.mutation({
      query: (bookDetails) => ({
        url: "/users/add-wishlist",
        method: "PUT",
        body: bookDetails,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getReadingList: builder.query({
      query: () => ({
        url: "/users/reading-list",
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["readingList"],
    }),
    addReadingList: builder.mutation({
      query: (readingData) => ({
        url: `/users/reading-list`,
        method: "PUT",
        body: readingData,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["readingList"],
    }),
    finishABookReadingList: builder.mutation({
      query: (readingData) => ({
        url: `/users/reading-list/finished`,
        method: "PUT",
        body: readingData,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["readingList"],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation,
  useAddWishListMutation,
  useGetReadingListQuery,
  useAddReadingListMutation,
  useFinishABookReadingListMutation,
} = userApi;
