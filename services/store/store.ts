import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userRedux/userReducer';
import campaignReducer from '../campaignRedux/campaignReducer';
import { bookmarkReducer } from '../bookMarkRedux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaigns: campaignReducer,
    bookmarks: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
