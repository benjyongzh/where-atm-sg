import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeoCode } from "../googleAPI/geocoder";
import { IAtmObject, rawFetchedNearbyPlacesInfo } from "@/lib/atmObject";

type InitialState = {
  allAtms: Array<rawFetchedNearbyPlacesInfo>;
  selectedAtmPlaceId: string | null;
};

const initialState: InitialState = {
  allAtms: [], //array of valid atms
  selectedAtmPlaceId: null,
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
    setSelectedAtmPlaceId: (state, action: PayloadAction<string | null>) => {
      // console.log("add action. payload: ", action.payload);
      state.selectedAtmPlaceId = action.payload;
    },
  },
});

export default atmDataSlice.reducer;
export const { setAtmData, setSelectedAtmPlaceId } = atmDataSlice.actions;
