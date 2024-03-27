// import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // interface IUserId {
// //   userId: number;
// //   username: string;
// //   email: string;
// //   password: string;
// // }

// const adapter = createEntityAdapter();

// const initialState = adapter.getInitialState({
//   loadingStatus: ''
// });

// const dataUsers = createAsyncThunk(
//   'userSlice/fetchUsers',
//   async (data) => {
//     try {
//       const response = 
//     } catch(error) {
//       console.log(error);
//     }
//   }
// )

// const userSlice = createSlice({
//   name: 'userSlice',
//   initialState,
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase()
//   }
// });

// export const { setUserId } = userSlice.actions;

// export default userSlice.reducer