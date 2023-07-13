import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getCurrentBreakpoint } from "@/utils/display";

type InitialState = { bankFilterOut: string[] };

const initialState: InitialState = {
  bankFilterOut: [],
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
  },
});

export default settingsSlice.reducer;
export const { addBankFilter, removeBankFilter } = settingsSlice.actions;
