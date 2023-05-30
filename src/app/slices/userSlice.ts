import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import UserService from '../services/user-service';
import { User } from '../../models/user';

const userService = new UserService();

// Async thunks

// Fetch user
export const fetchUser = createAsyncThunk(
  'user/fetchUserStatus',
  async (_, { getState, requestId, rejectWithValue, fulfillWithValue }) => {
    const { currentRequestId, loading } = (getState() as RootState).user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const { user, error } = await userService.fetchUser();
    console.log('DONE');
    console.log(user, error);
    if (error) {
      return rejectWithValue(error);
    }
    return fulfillWithValue(user);
  }
);

interface UserState {
  entity: User | undefined;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: string | undefined;
}

const initialState: UserState = {
  entity: undefined,
  loading: 'idle',
  currentRequestId: undefined,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.entity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      console.log('FETCHUSER PENDING');
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log('FETCHUSER FULFILLED');
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity = action.payload;
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log('FETCHUSER REJECTED');
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        console.log(action.payload);
        state.loading = 'idle';
        state.error = action.payload as string | undefined;
        state.currentRequestId = undefined;
      }
    });
  },
});

export const { set } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.entity;

export default userSlice.reducer;
