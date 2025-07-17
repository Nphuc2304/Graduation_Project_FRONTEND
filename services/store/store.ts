import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../userRedux/userReducer';
import campaignReducer from '../campaignRedux/campaignReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaigns: campaignReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
