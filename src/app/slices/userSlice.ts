import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '../../models/user';

interface UserState {
  current: User | undefined;
}

const initialState: UserState = {
  current: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
    },
  },
});

export const { set } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.current;

export default userSlice.reducer;
