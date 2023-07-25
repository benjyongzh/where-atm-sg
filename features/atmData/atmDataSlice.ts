import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeoCode } from "../googleAPI/geocoder";
import { IAtmObject, rawFetchedNearbyPlacesInfo } from "@/lib/atmObject";

type InitialState = {
  allAtms: Array<IAtmObject>;
  selectedAtmPlaceId: string | null;
  searchStarted: boolean;
};

const initialState: InitialState = {
  allAtms: [], //array of valid atms
  selectedAtmPlaceId: null,
  searchStarted: false,
};

// create slice takes an object with name, initialState and reducers
const atmDataSlice = createSlice({
  name: "atmData",
  initialState,
  reducers: {
    setAtmData: (state, action: PayloadAction<Array<IAtmObject>>) => {
      // console.log("add action. payload: ", action.payload);
      state.allAtms = action.payload;
    },
    setSelectedAtmPlaceId: (state, action: PayloadAction<string | null>) => {
      // console.log("add action. payload: ", action.payload);
      state.selectedAtmPlaceId = action.payload;
    },
    setSearchStarted: (state, action: PayloadAction<boolean>) => {
      // console.log("add action. payload: ", action.payload);
      state.searchStarted = action.payload;
    },
  },
});

export default atmDataSlice.reducer;
export const { setAtmData, setSelectedAtmPlaceId, setSearchStarted } =
  atmDataSlice.actions;
