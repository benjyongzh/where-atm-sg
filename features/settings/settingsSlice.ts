import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeoCode } from "../googleAPI/geocoder";

type InitialState = {
  bankFilterOut: string[];
  maxRange: number;
  searchLocationPoint: IGeoCode;
};

const initialState: InitialState = {
  bankFilterOut: [],
  maxRange: 1500,
  searchLocationPoint: {
    lat: 0,
    long: 0,
  },
};

// create slice takes an object with name, initialState and reducers
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addBankFilter: (state, action: PayloadAction<string>) => {
      state.bankFilterOut.push(action.payload);
    },
    removeBankFilter: (state, action: PayloadAction<string>) => {
      state.bankFilterOut = state.bankFilterOut.filter(
        (bankItem) => action.payload !== bankItem
      );
    },
    setMaxRange: (state, action: PayloadAction<number>) => {
      state.maxRange = action.payload;
    },

    setSearchLocationPoint: (state, action: PayloadAction<IGeoCode>) => {
      state.searchLocationPoint = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const {
  addBankFilter,
  removeBankFilter,
  setMaxRange,
  setSearchLocationPoint,
} = settingsSlice.actions;
