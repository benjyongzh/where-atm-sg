import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  displayedErrorMessage: string | null
};

const initialState: InitialState = {
  displayedErrorMessage: null
};

// create slice takes an object with name, initialState and reducers
const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setDisplayedErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.displayedErrorMessage = action.payload;
    },
    // removeDisplayedErrorMessage: (state) => {
    //   state.displayedErrorMessage = null
    // },
  },
});

export default errorsSlice.reducer;
export const {
  setDisplayedErrorMessage,
} = errorsSlice.actions;
