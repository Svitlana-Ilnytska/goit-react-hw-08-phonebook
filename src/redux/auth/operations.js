import { createApi  } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from './customFetchBase'

export const authUserApi = createApi({
  reducerPath: "authUserApi",
  baseQuery:   baseQueryWithReauth,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logInUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
} = authUserApi;
