import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookShelfApi = createApi({
  reducerPath: "bookShelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookshelf-backend.vercel.app/api/v1",
  }),
  tagTypes: ["allBook", "homeBook", "myBook", "singleBook", "readingList"],
  endpoints: () => ({}),
});
