import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/authSlice';
import TourReducer from '../features/tour/tourSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});
