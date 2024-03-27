import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardSlice, { actions as cardActions } from './slices/cardSlice';
import modalSlice, { actions as modalActions } from "./slices/modalSlice";
import navSlice, { actions as navActions } from "./slices/navSlice";
import transSlice, { actions as transActions } from './slices/transactionsSlice';

const rootReducer = combineReducers({
  cardSlice,
  modalSlice,
  navSlice,
  transSlice
})

const actions = {
  ...cardActions,
  ...modalActions,
  ...navActions,
  ...transActions,
}

const store = configureStore({
  reducer: rootReducer,
});

export { actions };
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export default store;