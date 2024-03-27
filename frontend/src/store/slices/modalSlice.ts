import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: {
    type: '',
    target: '',
    show: false
  }
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, {payload}) => {
      const {type, target} = payload;
      state.modal.show = true;
      state.modal.type = type;
      state.modal.target = target;
    },
    closeModal: (state, {payload}) => {
      const {type, target} = payload;
      state.modal.target = target;
      state.modal.type = type;
      state.modal.show = false;
    }
  }
});

const actions = {...modalSlice.actions};
export { actions };
export default modalSlice.reducer;