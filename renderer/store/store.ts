import { configureStore, Middleware, AnyAction } from "@reduxjs/toolkit";
import sessionsReducer from "./sessionsSlice";
import projectsReducer from "./projectsSlice";

// Custom middleware to log actions
const loggerMiddleware: Middleware = (store) => (next) => (action: AnyAction) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
