import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://connections-api.herokuapp.com";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
   
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => ({
        url: "/contacts",
      
      }),
      providesTags: ["Contact"],
    }),

    createContact: builder.mutation({
      query: ({ contactName }) => ({
        url: "/contacts",
        method: "POST",
      
        body: contactName,
      }),
      invalidatesTags: ["Contact"],
    }),

    editContact: builder.mutation({
      query: ({id, contactName}) => ({
        url: `/contacts/${id}`,
        method: "PATCH",
       
        body: contactName,
      }),
      invalidatesTags: ["Contact"],
    }),

    deleteContact: builder.mutation({
      query: ({id}) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
       
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useCreateContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
  } = contactApi;