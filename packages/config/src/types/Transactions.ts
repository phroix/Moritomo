import { OverviewType } from "./Overviews";

export type TransactionType = "positive" | "negative";

export type TransactionsResponse = {
  id: number;
  name: string;
  amount: number;
  type: TransactionType;
  date: string;
  overview_id: number;
};

export type TransactionsRequest = {
  name: string;
  amount: number;
  type: TransactionType;
  date: string;
  overview_id: number;
};

export type   overviewFilter = {
  id: number;
  date?: string;
  from: number;
  to: number;
  keep_data: boolean;
  type: OverviewType;
};
