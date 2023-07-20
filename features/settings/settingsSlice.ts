import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeoCode } from "../googleAPI/geocoder";

export const minSearchRange: number = 50;
export const maxSearchRange: number = 1500;
export const mapCenterDefault: IGeoCode = { lat: 1.343916, lng: 103.741643 };

type InitialState = {
  bankFilterOut: string[];
  maxRange: number;
  searchLocationPoint: IGeoCode;
  filterIsOpen: boolean;
};

const initialState: InitialState = {
  bankFilterOut: [],
  maxRange: maxSearchRange / 2,
  searchLocationPoint: mapCenterDefault,
  filterIsOpen: true,
};

// create slice takes an object with name, initialState and reducers
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addBankFilter: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((bank) => state.bankFilterOut.push(bank));
    },
    removeBankFilter: (state, action: PayloadAction<string[]>) => {
      state.bankFilterOut = state.bankFilterOut.filter(
        (bankItem) => !action.payload.includes(bankItem)
      );
    },
    setMaxRange: (state, action: PayloadAction<number>) => {
      state.maxRange = action.payload;
    },

    setSearchLocationPoint: (state, action: PayloadAction<IGeoCode>) => {
      state.searchLocationPoint = action.payload;
    },

    setFilterIsOpen: (state, action: PayloadAction<boolean>) => {
      state.filterIsOpen = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const {
  addBankFilter,
  removeBankFilter,
  setMaxRange,
  setSearchLocationPoint,
  setFilterIsOpen,
} = settingsSlice.actions;
