import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { LoginRequest, LoginResponse, LogoutResponse } from "@repo/config/auth";
import { moritomoApi } from "./MoritomoApi";

export const api = moritomoApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/session",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "auth/session",
        method: "DELETE",
      }),
    }),
    // protected: builder.mutation({
    //   query: () => "protected",
    // }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = api;
