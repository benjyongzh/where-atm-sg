import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rawAtmInfo } from "@/lib/webscraping-data";

type InitialState = { allAtms: Array<rawAtmInfo> };

const initialState: InitialState = {
  allAtms: [], //array of valid atms
};

// create slice takes an object with name, initialState and reducers
const atmDataSlice = createSlice({
  name: "atmData",
  initialState,
  reducers: {
    setAtmData: (state, action: PayloadAction<Array<rawAtmInfo>>) => {
      // console.log("add action. payload: ", action.payload);
      state.allAtms = action.payload;
    },
  },
});

export default atmDataSlice.reducer;
export const { setAtmData } = atmDataSlice.actions;
