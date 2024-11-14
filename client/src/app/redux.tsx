import { useRef } from "react"; // Import useRef for creating a store reference
import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Import functions to set up Redux store
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux"; // Import React-Redux hooks and provider component
import globalReducer from "@/state"; // Import the global reducer for application state
import { api } from "@/state/api"; // Import API slice from Redux toolkit for handling API calls
import { setupListeners } from "@reduxjs/toolkit/query"; // Import listeners to handle refetching and caching with RTK query

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // Import functions to persist state across reloads
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate to delay rendering until rehydration is complete
import createWebStorage from "redux-persist/lib/storage/createWebStorage"; // Import storage mechanism for persistence

/* REDUX PERSISTENCE */

// Function to create a no-op storage for server-side rendering to avoid errors
const createNoopStorage = () => {
  return {
    getItem(): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(value: unknown): Promise<unknown> {
      return Promise.resolve(value);
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

// Select storage type depending on environment (no-op storage for server, local storage for client)
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Configuration for redux-persist, specifying the storage type and state slices to persist
const persistConfig = {
  key: "root", // Key for root persistence
  storage,
  whitelist: ["global"], // Only persist the global slice of state
};

// Combine reducers: main global reducer and api reducer for handling API data
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

// Persist the combined reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */

// Factory function to create the Redux store with middleware and persisted reducer
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore persistence actions in the serializable check
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware), // Add RTK Query middleware for API handling
  });
};

/* REDUX TYPES */

// Define types for store, state, and dispatch to improve type safety with TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Create typed hooks for dispatch and selector to simplify use with Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */

// StoreProvider component wraps the app with Redux store and persistence
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(); // Create a store reference to avoid recreating store on each render
  if (!storeRef.current) {
    storeRef.current = makeStore(); // Initialize the store if not already created
    setupListeners(storeRef.current.dispatch); // Enable RTK Query listeners for caching and refetching
  }
  const persistor = persistStore(storeRef.current); // Persist the store with redux-persist

  return (
    <Provider store={storeRef.current}>
      {" "}
      {/* Wrap app with Redux provider */}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Wait for rehydration before rendering children */}
        {children}
      </PersistGate>
    </Provider>
  );
}
