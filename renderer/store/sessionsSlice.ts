import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, TimerSession } from "../../types";

interface SessionsState {
  sessions: { [key: string]: TimerSession };
}

const initialState: SessionsState = {
  sessions: {},
};

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    saveSession: (state, action: PayloadAction<TimerSession>) => {
      state.sessions[action.payload.ticketNumber] = {
        ...action.payload,
      };
    },
    updateSessionTimer: (
      state,
      action: PayloadAction<{
        ticketNumber: string;
        sessionIndex: number;
        duration: number;
        totalElapsed: number;
      }>
    ) => {
      const { ticketNumber, sessionIndex, duration, totalElapsed } =
        action.payload;
      const timerSession = state.sessions[ticketNumber];
      if (timerSession && timerSession.sessions[sessionIndex]) {
        timerSession.sessions[sessionIndex].duration = duration;
        timerSession.totalElapsed = totalElapsed;
      }
    },
  },
});

export const { saveSession, updateSessionTimer } = sessionsSlice.actions;
export default sessionsSlice.reducer;
