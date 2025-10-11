import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@repo/config/api";
import type { RootState } from "../../web/store";
import { client } from "@repo/config/client";
import { resetMoritomo } from "../slices/Moritomo";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${API_CONFIG.BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const isAnonymous = state.moritomo.authStatus === "nonAuthenticated";
    if (isAnonymous) return headers;

    const access = state.moritomo.session.access_token;
    if (access) headers.set("authorization", `Bearer ${access}`);

    // Nur wenn der Request es EXPLIZIT fordert, hänge den Refresh-Token an:
    if (headers.get("x-requires-auth-session") === "1") {
      const refresh = state.moritomo.session.refresh_token;
      if (refresh) headers.set("x-refresh-token", refresh);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;

    const refreshResult = await client.post(
      `${API_CONFIG.BASE_URL}/auth/refreshSession`,
      {},
      {
        headers: {
          Authorization: `Bearer ${state.moritomo.session?.access_token}`,
          "x-refresh-token": state.moritomo.session?.refresh_token,
        },
      }
    );

    if (refreshResult.data) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetMoritomo());
    }
  }

  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const moritomoApi = createApi({
  reducerPath: "moritomoApi",
  baseQuery: baseQueryWithReauth,
  // baseQuery: rawBaseQuery,
  tagTypes: ["Auth", "Overviews", "Transactions"],
  endpoints: () => ({}),
});