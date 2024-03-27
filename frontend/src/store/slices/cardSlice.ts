import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface ICard {
  id: number;
  userId: number;
  name: string;
  goal: number;
  balance: string;
  type: string;
  color: string;
  history: Array<{
    nameTrans:string;
    amount:number;
    goal:number;
    createdAt: Date;
    userId: number;
    cardName:string;
    cardId: number;
    id: number;
    userName: string;
  }>;
}

const adapter = createEntityAdapter<ICard>();

const initialState = adapter.getInitialState({
  currentCardId: null, loadingStatus: '', cards: []
});

const fetchData = createAsyncThunk(
  'cardSlice/fetchUserCards',
  async (userId:number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/c/getAll?userId=${userId}`);
      return response.data;
    } catch(error) {
      console.log(error);
      throw error;
    }
  },
);

interface ICardSend {
  name: string;
  goal: number;
  balance: string;
  userId: number;
  type: string;
  color: string;
}

interface ICardUpdate {
  name?: string;
  goal?: number;
  userId: number;
  id: number;
  color?: string;
  balance?: number;
}

interface ICardDel {
  params: {
    id: number;
    userId: number;
  }
}

const addCard = createAsyncThunk(
  'cardSlice/addCard',
  async (cardData:ICardSend) => {
    try {
      const response = await axios.post('http://localhost:5000/api/c/create', cardData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const deleteCard = createAsyncThunk(
  'cardSlice/deleteCard',
  async (data:ICardDel) => {
    try {
      await axios.delete(`http://localhost:5000/api/c/delete`, {data});
    } catch(error) {
      throw new Error(`${error}`)
    }
  }
)

const changeCard = createAsyncThunk(
  'cardSlice/changeCard',
  async (data: ICardUpdate) => {
    try {
      const response = await axios.patch('http://localhost:5000/api/c/update', data);
      return response.data;
    } catch(error) {
      console.log(error)
    }
  }
);

const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {
    update: adapter.updateOne,
    addOne: adapter.addOne,
    delete: adapter.removeOne,
    selectCard: (state, {payload}) => {
      state.currentCardId = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        adapter.addMany(state, payload);
        if (payload.length > 0) {
          state.currentCardId = payload[0].id
        }
        state.cards = payload;
        state.loadingStatus = 'idle';
      })
      .addCase(fetchData.rejected, (state) => {
        state.loadingStatus = 'failed';
      })
      .addCase(addCard.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(addCard.fulfilled, (state, {payload}) => {
        adapter.addOne(state, payload);
        state.currentCardId = payload.id;
        state.loadingStatus = 'idle';
      })
      .addCase(addCard.rejected, (state) => {
        state.loadingStatus = 'failed';
      })
      .addCase(deleteCard.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.loadingStatus = 'idle';
      })
      .addCase(deleteCard.rejected, (state) => {
        state.loadingStatus = 'failed';
      })
      .addCase(changeCard.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(changeCard.fulfilled, (state, action) => {
        adapter.updateOne(state, {id: action.payload.id, changes: action.payload});
        state.loadingStatus = 'idle';
      })
      .addCase(changeCard.rejected, (state) => {
        state.loadingStatus = 'failed';
      })
  }
});

const actions = { ...cardSlice.actions, fetchData, addCard, changeCard, deleteCard };

export { actions, addCard, changeCard, deleteCard, fetchData };
export const selectors = adapter.getSelectors((state: RootState) => state.cardSlice);

export default cardSlice.reducer;