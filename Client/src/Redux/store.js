import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import { combineReducers } from "redux";
import authSlice from "./authSlice";
import companySlice from "./companySlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage, // Use localStorage as default
};

// Combine reducers if you have multiple slices
const rootReducer = combineReducers({
  auth: authSlice,
  companies: companySlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor instance
const persistor = persistStore(store);

export { store, persistor };
