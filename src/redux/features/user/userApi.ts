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
  }),
});

export const { useSignUpUserMutation, useLoginUserMutation } = userApi;
