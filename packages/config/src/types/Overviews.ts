export type OverviewType = "monthly" | "once";

export type OverviewsResponse = {
  id: number;
  name: string;
  type: OverviewType;
  date: string;
  user_id: string;
  keep_data: boolean;
};

export type OverviewsRequest = {
  name: string;
  type: OverviewType;
  date: string;
  user_id: string;
  keep_data: boolean;
};

export type monthlyOverviewAmountFilter = {
  overviews: {
    id: number;
    date: string;
  }[];
};

export type monthylOverviewFilter = {
  date: string;
  user_id: string;
  from: number;
  to: number;
};

