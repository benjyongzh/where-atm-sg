import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  displayedErrorMessage: string | null;
  currentErrorMessages: string[];
};

const initialState: InitialState = {
  displayedErrorMessage: null,
  currentErrorMessages: [],
};

// create slice takes an object with name, initialState and reducers
const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setDisplayedErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.displayedErrorMessage = action.payload;
    },
    setErrorMessages: (state, action: PayloadAction<string[]>) => {
      state.currentErrorMessages = action.payload;
    },
    addErrorMessage: (state, action: PayloadAction<string>) => {
      state.currentErrorMessages.push(action.payload);
    },
    removeErrorMessage: (state, action: PayloadAction<string>) => {
      state.currentErrorMessages = state.currentErrorMessages.filter(
        (errorMsg) => errorMsg != action.payload
      );
    },
  },
});

export default errorsSlice.reducer;
export const {
  setDisplayedErrorMessage,
  setErrorMessages,
  addErrorMessage,
  removeErrorMessage,
} = errorsSlice.actions;
