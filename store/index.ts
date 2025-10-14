import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import api from './api';
import userSlice from './slices/userSlice';

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    whitelist: [

    ],
    blacklist: [
      'user',
    ],
  },
  combineReducers({
    user: persistReducer({
      key: "user",
      storage: AsyncStorage,
      blacklist: ["isLoading"]
    }, userSlice.reducer),
    [api.reducerPath]: api.reducer,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});

export type AppState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
