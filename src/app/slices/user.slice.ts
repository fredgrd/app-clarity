import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import UserService from '../services/user.service';
import { User } from '../../models/user.model';

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
    if (error) {
      return rejectWithValue(error);
    }
    return fulfillWithValue(user);
  }
);

// Signin user
export const signinWithCredentials = createAsyncThunk(
  'user/signinWithCredentialsStatus',
  async (
    credentials: { email: string; password: string },
    { getState, requestId, rejectWithValue, fulfillWithValue }
  ) => {
    const { currentRequestId, loading } = (getState() as RootState).user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const { email, password } = credentials;
    const { user, error } = await userService.signinWithCredentials(
      email,
      password
    );
    if (error) {
      return rejectWithValue(error);
    }
    return fulfillWithValue(user);
  }
);

export const singinWithToken = createAsyncThunk(
  'user/signinWithTokenStatus',
  async (
    token: string,
    { getState, requestId, rejectWithValue, fulfillWithValue }
  ) => {
    const { currentRequestId, loading } = (getState() as RootState).user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const { user, error } = await userService.signinWithToken(token);
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
    // FetchUser
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

    // SigninWithCredentials
    builder.addCase(signinWithCredentials.pending, (state, action) => {
      console.log('SINGINUSER PENDING');
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(signinWithCredentials.fulfilled, (state, action) => {
      console.log('SINGINUSER FULFILLED');
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity = action.payload;
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(signinWithCredentials.rejected, (state, action) => {
      console.log('SINGINUSER REJECTED');
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        console.log(action.payload);
        state.loading = 'idle';
        state.error = action.payload as string | undefined;
        state.currentRequestId = undefined;
      }
    });

    // SigninWithToken
    builder.addCase(singinWithToken.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(singinWithToken.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity = action.payload;
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(singinWithToken.rejected, (state, action) => {
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
