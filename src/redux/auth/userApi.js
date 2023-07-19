import { createApi } from '@reduxjs/toolkit/query/react';
import { setToken } from '../auth/slice';
import baseQueryWithReauth from './customFetchBase'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query() {
        return {
          url: '/users/current',
        };
      },
      providesTags: ["User"],
      transformResponse: (result) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (error) {}
      },
    }),
  }),
});


export const {
      useGetUserQuery,
    } = userApi;
    