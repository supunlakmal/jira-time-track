import { configureStore, Middleware, AnyAction } from "@reduxjs/toolkit";
import sessionsReducer from "./sessionsSlice";

// Custom middleware to log actions
const loggerMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const anyAction = action as AnyAction;
  console.group(anyAction.type);
  console.info('dispatching', anyAction);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
