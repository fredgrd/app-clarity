import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import notificationReducer from './slices/notification.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
