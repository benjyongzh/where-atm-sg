import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeoCode } from "../googleAPI/geocoder";
import { rawFetchedNearbyPlacesInfo } from "@/lib/atmObject";

type InitialState = { allAtms: Array<rawFetchedNearbyPlacesInfo> };

const initialState: InitialState = {
  allAtms: [], //array of valid atms
};

// create slice takes an object with name, initialState and reducers
const atmDataSlice = createSlice({
  name: "atmData",
  initialState,
  reducers: {
    setAtmData: (
      state,
      action: PayloadAction<Array<rawFetchedNearbyPlacesInfo>>
    ) => {
      // console.log("add action. payload: ", action.payload);
      state.allAtms = action.payload;
    },
  },
});

export default atmDataSlice.reducer;
export const { setAtmData } = atmDataSlice.actions;
