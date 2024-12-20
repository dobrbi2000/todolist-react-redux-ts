import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer, { TodosState } from './todoSlice';
import apiReducer, { ApiState } from './apiSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
  todos: TodosState;
  api: ApiState;
}

const rootReducer = combineReducers({
  todos: todoReducer,
  api: apiReducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
