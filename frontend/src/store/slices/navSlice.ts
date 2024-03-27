import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nav: {
    type: 'cards',
  }
};

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    openNav: (state, {payload}) => {
      const {type} = payload;
      state.nav.type = type;
    },
    closeNav: (state, {payload}) => {
      const {type} = payload;
      state.nav.type = type;
    }
  }
});

const actions = {...navSlice.actions};
export { actions };
export default navSlice.reducer;