// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk('users/fetchUserData', async (token: string) => {
  const response = await fetch('http://localhost:3883/users/fetch-user-data', {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], status: 'idle', error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An unknown error occurred';
      });
  },
});

export default userSlice.reducer;
