import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentBreakpoint } from "@/app/_utils/display";

export interface IScreenSize {
  screenWidth: number;
  screenHeight: number;
}

type InitialState = { screenSize: IScreenSize; currentBreakpoint: string };

const initialState: InitialState = {
  screenSize: { screenWidth: 0, screenHeight: 0 },
  currentBreakpoint: "xl",
};

// create slice takes an object with name, initialState and reducers
const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    storeScreenSize: (state, action: PayloadAction<IScreenSize>) => {
      state.screenSize = action.payload;
      state.currentBreakpoint = getCurrentBreakpoint(
        action.payload.screenWidth
      );
    },
  },
});

export default displaySlice.reducer;
export const { storeScreenSize } = displaySlice.actions;
