import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice.js";
import themeReducer from './Slice/themeSlice.js'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootreducer = combineReducers({
  user: userReducer,
  theme:themeReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootreducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
