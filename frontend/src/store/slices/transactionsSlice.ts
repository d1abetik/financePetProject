import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState({
  loadingStatus: '', error: ''
});

const fetchDataTrans = createAsyncThunk(
  'transSlice/fetchData',
  async ({userId, cardId}: {userId:number, cardId: number}) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tr/getAll?userId=${userId}&cardId=${cardId}`);
      return response.data
    } catch(error) {
      console.log(error);
    }
  }
);

const deleteTrans = createAsyncThunk(
  'transSlice/deleteTrans',
  async (data) => {
    try {
      await axios.delete(`http://localhost:5000/api/tr/delete`, {data});
    } catch(error) {
      console.log(error);
    }
  }
);

interface ITransCreate {
  amount?:number;
  goal?:number;
  userId: number;
  cardName: string;
  nameTrans: string;
  type: string;
  userName: string;
  cardId: number;
}

const createTrans = createAsyncThunk(
  'transSlice/createTrans',
  async (data: ITransCreate) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/tr/create`, data);
      return response.data;
    } catch(error) {
      console.log(error);
    }
  }
)


const transSlice = createSlice({
  name: 'transSlice',
  initialState,
  reducers: {
    addOne: adapter.addOne,
    removeOne: adapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchDataTrans.pending, (state) => {
      state.loadingStatus = 'pending';
    })
    .addCase(fetchDataTrans.fulfilled, (state, {payload}) => {
      adapter.addMany(state, payload);
      state.loadingStatus = 'idle';
    })
    .addCase(fetchDataTrans.rejected, (state) => {
      state.loadingStatus = 'failed';
    })
    .addCase(deleteTrans.pending, (state) => {
      state.loadingStatus = 'pending';
    })
    .addCase(deleteTrans.fulfilled, (state) => {
      state.loadingStatus = 'idle';
    })
    .addCase(deleteTrans.rejected, (state) => {
      state.loadingStatus = 'failed';
    })
    .addCase(createTrans.pending, (state) => {
      state.loadingStatus = 'pending';
    })
    .addCase(createTrans.fulfilled, (state, {payload}) => {
      state.loadingStatus = 'idle';
      adapter.addOne(state, payload);
    })
    .addCase(createTrans.rejected, (state) => {
      state.loadingStatus = 'failed';
    })
  }
});

const actions = { ...transSlice.actions, fetchDataTrans, createTrans, deleteTrans };

export { actions, createTrans, deleteTrans, fetchDataTrans };
export const selectors = adapter.getSelectors((state: RootState) => state.transSlice);

export default transSlice.reducer;