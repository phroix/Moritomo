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
      query: ({ id, date, from, to, keep_data, type }) => {
        const params = new URLSearchParams({
          id: id.toString(),
          from: from.toString(),
          to: to.toString(),
          keep_data: keep_data.toString(),
          type: type.toString(),
          date: date?.toString() ?? "",
        });
        
        return {
          url: `zaimu/transactions/transactionsByOverview?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ["Transactions"],
    }),
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
      { transaction_id: number; transaction: TransactionsRequest }
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
