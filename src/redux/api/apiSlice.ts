import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IUser {
  email: string;
  password: string;
}

export const bookShelfApi = createApi({
  reducerPath: "bookShelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
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
  }),
});

export const { useSignUpUserMutation, useLoginUserMutation } = bookShelfApi;
