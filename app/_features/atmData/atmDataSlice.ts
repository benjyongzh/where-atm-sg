import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAtmObject, atmLoadingDirectionsFlag } from "@/app/_lib/atmObject";

type InitialState = {
  allAtms: Array<IAtmObject>;
  selectedAtmPlaceId: string | null;
  onHoverAtmPlaceId: string | null;
  searchStarted: boolean;
  allAtmLoadingDirectionsFlags: Array<atmLoadingDirectionsFlag>;
};

const initialState: InitialState = {
  allAtms: [], //array of valid atms
  selectedAtmPlaceId: null,
  onHoverAtmPlaceId: null,
  searchStarted: false,
  allAtmLoadingDirectionsFlags: [],
};

// create slice takes an object with name, initialState and reducers
const atmDataSlice = createSlice({
  name: "atmData",
  initialState,
  reducers: {
    setAtmData: (state, action: PayloadAction<Array<IAtmObject>>) => {
      // console.log("add action. payload: ", action.payload);
      state.allAtms = action.payload;
      action.payload.forEach((atm) => {
        state.allAtmLoadingDirectionsFlags.push({
          atm,
          isLoadingDirections: false,
        });
      });
    },
    setSelectedAtmPlaceId: (state, action: PayloadAction<string | null>) => {
      // console.log("add action. payload: ", action.payload);
      state.selectedAtmPlaceId = action.payload;
    },
    setOnHoverAtmPlaceId: (state, action: PayloadAction<string | null>) => {
      // console.log("add action. payload: ", action.payload);
      state.onHoverAtmPlaceId = action.payload;
    },
    setSearchStarted: (state, action: PayloadAction<boolean>) => {
      // console.log("add action. payload: ", action.payload);
      state.searchStarted = action.payload;
    },
    setParticularAtmData: (state, action: PayloadAction<IAtmObject>) => {
      state.allAtms = state.allAtms.map((atm) => {
        if (atm.place_id === action.payload.place_id) {
          return action.payload;
        } else return atm;
      });
    },
    setParticularAtmIsLoadingDirectionsFlag: (
      state,
      action: PayloadAction<atmLoadingDirectionsFlag>
    ) => {
      state.allAtmLoadingDirectionsFlags =
        state.allAtmLoadingDirectionsFlags.map((flagObject) => {
          if (flagObject.atm.place_id === action.payload.atm.place_id) {
            return action.payload;
          } else return flagObject;
        });
    },
  },
});

export default atmDataSlice.reducer;
export const {
  setAtmData,
  setSelectedAtmPlaceId,
  setOnHoverAtmPlaceId,
  setSearchStarted,
  setParticularAtmData,
  setParticularAtmIsLoadingDirectionsFlag,
} = atmDataSlice.actions;
