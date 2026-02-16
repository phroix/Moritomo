import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OverviewType } from "@repo/config/types/Overviews.ts";

const initialState = {
  selectedOverview: {
    id: 0,
    name: "",
    date: "",
    user_id: "",
    keep_data: false,
    type: "monthly",
  },
  selectedDate: "",
  overviewSumAmount: 0,
};

export const ZaimuSlice = createSlice({
  name: "zaimu",
  initialState: initialState,
  reducers: {
    resetZaimu: () => {
      return initialState;
    },
    updateZaimu: (state, action: PayloadAction<{ id: number; name: string; date: string; user_id: string; keep_data: boolean; type: OverviewType; }>) => {
      state.selectedOverview = action.payload;
    },
    updateSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setOverViewAmount: (state, action: PayloadAction<number>) => {
      state.overviewSumAmount = action.payload;
    },
    addOverviewAmount: (state, action: PayloadAction<number>) => {
      console.log("add");
      state.overviewSumAmount += action.payload;
    },
    resetOverviewAmount: (state) => {
      console.log("reset");
      state.overviewSumAmount = 0;
    }
  },
});

export const { resetZaimu, updateZaimu, updateSelectedDate, addOverviewAmount, resetOverviewAmount, setOverViewAmount } = ZaimuSlice.actions;
export const selectZaimu = (state: any) => state.zaimu;

export default ZaimuSlice.reducer;
