import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface NotificationState {
  isToastVisible: boolean;
  toastMessage: string | undefined;
}

const initialState: NotificationState = {
  isToastVisible: false,
  toastMessage: undefined,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<string>) => {
      state.isToastVisible = true;
      state.toastMessage = action.payload;
    },
    resetToast: (state) => {
      state.isToastVisible = false;
      state.toastMessage = undefined;
    },
  },
});

export const { setToast, resetToast } = notificationSlice.actions;

export const selectToast = (state: RootState) => ({
  isVisible: state.notification.isToastVisible,
  message: state.notification.toastMessage,
});

export default notificationSlice.reducer;
