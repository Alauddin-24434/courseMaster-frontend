// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cmAuth from "@/redux/features/auth/authSlice";
import baseApi from "@/redux/baseApi/baseApi";
import progressReducer from "@/redux/slices/coursesSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// 1️⃣ combine reducers
const rootReducer = combineReducers({
  cmAuth,
  progress: progressReducer, // ✅ add pro
  [baseApi.reducerPath]: baseApi.reducer,
});

// 2️⃣ persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cmAuth","progress"], 
};

// 3️⃣ persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// 5️⃣ persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
