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

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().tracker));
  } catch (err) {
    console.error('Could not save state', err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;