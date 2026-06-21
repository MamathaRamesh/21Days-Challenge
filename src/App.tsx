// src/App.tsx
import { useSelector, useDispatch } from 'react-redux';
import type  { RootState } from './store/store';
import { markDay, resetTracker } from './store/trackerSlice';

function App() {
  const dispatch = useDispatch();
  const { entries, totalDays } = useSelector((state: RootState) => state.tracker);

  const successCount = entries.filter(e => e.success === true).length;
  const progressPercent = Math.round((successCount / totalDays) * 100);

  // Find current streak (consecutive success from day 1)
  let streak = 0;
  for (const entry of entries) {
    if (entry.success === true) {
      streak++;
    } else {
      break;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
          🍬 Sugar-Free Challenge
        </h1>
        <p className="text-center text-gray-500 mb-6">21 Day Tracker</p>

        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-indigo-600">{successCount}/{totalDays} days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 bg-orange-50 rounded-lg py-2">
            <span className="text-2xl">🔥</span>
            <span className="text-lg font-bold text-orange-600">{streak} day streak</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {entries.map((entry) => (
            <div
              key={entry.day}
              className={`rounded-xl p-3 text-center shadow-sm border-2 ${
                entry.success === true
                  ? 'bg-green-50 border-green-400'
                  : entry.success === false
                  ? 'bg-red-50 border-red-300'
                  : 'bg-white border-gray-200'
              }`}
            >
              <p className="text-xs text-gray-500 mb-1">Day</p>
              <p className="text-lg font-bold text-gray-800 mb-2">{entry.day}</p>

              <div className="flex gap-1 justify-center">
                <button
                  onClick={() => dispatch(markDay({ day: entry.day, success: true }))}
                  className={`text-sm px-2 py-1 rounded-lg ${
                    entry.success === true
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ✅
                </button>
                <button
                  onClick={() => dispatch(markDay({ day: entry.day, success: false }))}
                  className={`text-sm px-2 py-1 rounded-lg ${
                    entry.success === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => dispatch(resetTracker())}
          className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300"
        >
          Reset Challenge
        </button>

      </div>
    </div>
  );
}

export default App;