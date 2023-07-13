import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getCurrentBreakpoint } from "@/utils/display";

type InitialState = { bankFilterOut: string[]; maxRange: number };

const initialState: InitialState = {
  bankFilterOut: [],
  maxRange: 2000,
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
  },
});

export default settingsSlice.reducer;
export const { addBankFilter, removeBankFilter, setMaxRange } =
  settingsSlice.actions;
