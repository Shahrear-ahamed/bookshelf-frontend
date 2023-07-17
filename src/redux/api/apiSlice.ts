import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookShelfApi = createApi({
  reducerPath: "bookShelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  tagTypes: ["allBook", "homeBook", "myBook", "singleBook"],
  endpoints: () => ({}),
});
