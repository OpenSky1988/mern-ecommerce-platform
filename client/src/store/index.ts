import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST, persistReducer,
  persistStore, PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cart from './slices/cart';
import user from './slices/user';

const rootReducer = combineReducers({
  cart,
  user,
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  version: 1,
}, rootReducer);

const toolkitPersistMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        REHYDRATE,
      ],
    },
  });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: toolkitPersistMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export let persistor = persistStore(store);
