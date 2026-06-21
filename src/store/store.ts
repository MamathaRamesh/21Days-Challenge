// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from './trackerSlice';

const STORAGE_KEY = 'sugar-tracker-state';

// Load saved state from localStorage (if any)
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return undefined;
    return { tracker: JSON.parse(saved) };
  } catch (err) {
    return undefined;
  }
}


export const store = configureStore({
  reducer: {
    tracker: trackerReducer, 
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;