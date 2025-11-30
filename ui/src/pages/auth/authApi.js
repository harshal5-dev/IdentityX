import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../lib/utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),

    isAuthenticated: builder.query({
      query: () => ({
        url: "/auth/is-authenticated",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useIsAuthenticatedQuery,
  useLogoutMutation,
  useGetUserInfoQuery,
} = authApi;
