// src/store/trackerSlice.ts
import { createSlice,type  PayloadAction } from '@reduxjs/toolkit';

export interface DayEntry {
  day: number;
  date: string;
  success: boolean | null; // null = not marked yet
}

interface TrackerState {
  totalDays: number;
  entries: DayEntry[];
}

const initialState: TrackerState = {
  totalDays: 21,
  entries: Array.from({ length: 21 }, (_, i) => ({
    day: i + 1,
    date: '',
    success: null,
  })),
};

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    markDay: (state, action: PayloadAction<{ day: number; success: boolean }>) => {
      const entry = state.entries.find(e => e.day === action.payload.day);
      if (entry) {
        entry.success = action.payload.success;
        entry.date = new Date().toLocaleDateString();
      }
    },
    resetTracker: (state) => {
      state.entries = Array.from({ length: 21 }, (_, i) => ({
        day: i + 1,
        date: '',
        success: null,
      }));
    },
  },
});

export const { markDay, resetTracker } = trackerSlice.actions;
export default trackerSlice.reducer;