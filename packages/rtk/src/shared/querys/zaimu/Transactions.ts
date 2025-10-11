import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  TransactionsResponse,
  TransactionsRequest,
  overviewFilter,
} from "@repo/config/transactions";
import { moritomoApi } from "../MoritomoApi";

export const api = moritomoApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionsResponse[], overviewFilter>({
      query: ({ overview_id, date, from, to }) => ({
        url: `/transactions/transactionsByOverview?overview_id=${overview_id}&date=${date}&from=${from}&to=${to}`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),

    // getOverviewAmount: builder.query<
    //   TransactionsResponse[],
    //   monthlyOverviewAmountFilter
    // >({
    //   query: ({ overviews }) => ({
    //     url: `zaimu/overviews/monthlyOverviewAmount?overviews=${overviews}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Overviews"],
    // }),

    createTransaction: builder.mutation<
      [TransactionsResponse],
      TransactionsRequest
    >({
      query: (transaction) => ({
        url: "zaimu/transactions/transaction",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transactions"],
    }),

    updateTransaction: builder.mutation<
      [TransactionsRequest],
      { transaction_id: number; transaction: TransactionsResponse }
    >({
      query: ({ transaction_id, transaction }) => ({
        url: `zaimu/transactions/transaction/${transaction_id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: ["Transactions"],
    }),

    deleteTransaction: builder.mutation<
      [TransactionsRequest],
      { transaction_id: number }
    >({
      query: ({ transaction_id }) => ({
        url: `zaimu/transactions/transaction/${transaction_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  // useGetOverviewAmountQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = api;
