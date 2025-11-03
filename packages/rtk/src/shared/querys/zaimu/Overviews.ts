import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  monthlyOverviewAmountFilter,
  OverviewsRequest,
  OverviewsResponse,
  monthylOverviewFilter,
} from "@repo/config/overviews";
import { moritomoApi } from "../MoritomoApi";

export const api = moritomoApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviews: builder.query<OverviewsResponse[], monthylOverviewFilter>({
      query: ({ date, user_id, from, to }) => ({
        url: `zaimu/overviews/monthlyOverviews?date=${date}&user_id=${user_id}&from=${from}&to=${to}`,
        method: "GET",
      }),
      providesTags: ["Overviews"],
      keepUnusedDataFor: 0,
    }),

    getOverviewAmount: builder.query<
      OverviewsResponse[],
      { date: string; id: number }
    >({
      query: ({ date, id }) => ({
        url: `zaimu/overviews/monthlyOverviewAmount?date=${date}&id=${id}`,
        method: "GET",
      }),
      providesTags: ["Overviews"],
      keepUnusedDataFor: 0,
    }),

    createOverview: builder.mutation<[OverviewsResponse], OverviewsRequest>({
      query: (overview) => ({
        url: "zaimu/overviews/overview",
        method: "POST",
        body: overview,
      }),
      invalidatesTags: ["Overviews"],
    }),

    updateOverview: builder.mutation<
      [OverviewsRequest],
      { overview_id: number; overview: OverviewsRequest }
    >({
      query: ({ overview_id, overview }) => ({
        url: `zaimu/overviews/overview/${overview_id}`,
        method: "PUT",
        body: overview,
      }),
      invalidatesTags: ["Overviews"],
    }),

    deleteOverview: builder.mutation<
      [OverviewsRequest],
      { overview_id: number }
    >({
      query: ({ overview_id }) => ({
        url: `zaimu/overviews/overview/${overview_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Overviews"],
    }),
  }),
});

export const {
  useGetOverviewsQuery,
  useGetOverviewAmountQuery,
  useCreateOverviewMutation,
  useUpdateOverviewMutation,
  useDeleteOverviewMutation,
} = api;
