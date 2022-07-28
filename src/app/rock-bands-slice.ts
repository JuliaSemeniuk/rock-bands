import { createSlice } from "@reduxjs/toolkit";

interface Band {
  id: number;
  name: string;
  details: {
    years: {
      start: string;
      end: string;
    };
    origin: string;
    members: {
      present: string[];
      past: string[];
    };
    picture: string;
  };
}

export interface NewBand {
  id: string;
  name: string;
  startYear: string;
  endYear: string;
  origin: string;
  presentMembers: string[];
  pastMembers: string[];
  picture: string;
}

interface RockBandsState {
  bands: Band[];
  newBand: NewBand;
}

const initialState: RockBandsState = {
  bands: [],
  newBand: {
    id: "",
    name: "",
    startYear: "",
    endYear: "",
    origin: "",
    presentMembers: [],
    pastMembers: [],
    picture: "",
  },
};

export const rockBandsStoreSlice = createSlice({
  name: "rock bands",
  initialState,
  reducers: {
    init: (state, action) => {
      state.bands = action.payload;
    },
    setName: (state, action) => {
      state.newBand.name = action.payload;
    },
    addNewBand: (state, action) => {
      state.bands.push(action.payload);
    },
  },
});

export const { init, setName, addNewBand } = rockBandsStoreSlice.actions;
export default rockBandsStoreSlice.reducer;
